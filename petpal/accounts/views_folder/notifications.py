from accounts.models import Notification, User
from pets.models import Application, Comment, Reply
from rest_framework import permissions, serializers
from rest_framework.permissions import AllowAny, IsAuthenticated
from accounts.serializers_folder.notif_serializers import NotificationSerializer
from rest_framework.generics import CreateAPIView, RetrieveAPIView, ListAPIView, UpdateAPIView, DestroyAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404, redirect
from rest_framework import status

class NotificationCreate(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def perform_create(self, serializer, *args, **kwargs):
        user_to_be_notified = self.request.user

        if "application_id" in self.request.data and not "comment_or_reply_id" in self.request.data:
            # Status change
            application_id = self.request.data.get('application_id')
            application = get_object_or_404(Application, id=application_id)

            if self.request.user != application.shelter:
                return Response('Invalid permissions')
            else:
                user_to_be_notified = application.applicant

            message = 'Your application for ' + application.pet.name + ' has changed to the status: ' + application.status + '.'
        elif "application_id" in self.request.data:
            # new application comment
            application_id = self.request.data.get('application_id')
            comment_id = self.request.data.get('comment_or_reply_id')
            application = get_object_or_404(Application, id=application_id)

            if self.request.user == application.applicant:
                user_to_be_notified = application.shelter
            elif self.request.user == application.shelter:
                user_to_be_notified = application.applicant
            else:
                return Response('Invalid permissions')
                
            comment = get_object_or_404(Comment, application=application, id=comment_id)
            message = 'Your application for ' + application.pet.name + ' has a new reply.'
        elif "shelter_id" in self.request.data and "comment_or_reply_id" in self.request.data and "review_id" in self.request.data:
            # reply to a review
            shelter_id = self.request.data.get('shelter_id')
            review_id = self.request.data.get('review_id')
            reply_id = self.request.data.get('comment_or_reply_id')
            shelter = get_object_or_404(User, id=shelter_id)
            review = get_object_or_404(Comment, shelter=shelter, id=review_id)
            reply = get_object_or_404(Reply, id=reply_id, review=review)

            if self.request.user != reply.commenter:
                return Response('Invalid permissions')
            else:
                if self.request.user == review.shelter:
                    user_to_be_notified = review.commenter
                else:
                    user_to_be_notified = review.shelter
            
            message = 'You have a new reply to a review.'
        elif "shelter_id" in self.request.data and "review_id" in self.request.data:
            # new review
            review_id = self.request.data.get('review_id')
            shelter_id = self.request.data.get('shelter_id')
            shelter = get_object_or_404(User, id=shelter_id)
            review = get_object_or_404(Comment, shelter=shelter, id=review_id)

            if self.request.user != review.commenter:
                return Response('Invalid permissions')
            else:
                user_to_be_notified = review.shelter
                
            message = 'You have a new review!'
        else:
            return Response('Ids for relevant models should be provided')

        serializer.save(user=user_to_be_notified, message=message)

class NotificationUpdate(UpdateAPIView):
    """
    Update whether a notification is read or not.
    """
    permission_classes = [IsAuthenticated]
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    lookup_field = 'pk'

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_read = request.data.get("is_read")
        if (instance.is_read == 'true'):
            instance.is_read = True
        else:
            instance.is_read = False
        instance.save()

        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)
    
class NotificationsList(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer
    paginate_by = 5

    def get_queryset(self):
        user = self.request.user.id
        queryset = Notification.objects.filter(user=user)

        display_is_read = self.request.query_params.get("display_is_read")

        if display_is_read is not None:
            queryset = queryset.filter(is_read=display_is_read.lower() == 'true')

        sort_ascending = self.request.query_params.get("sort_ascending")

        if sort_ascending is not None:
            sort_ascending = sort_ascending.lower() == 'true'\
            
            if sort_ascending:
                return queryset.order_by('timestamp')

        return queryset.order_by('-timestamp')


# add message
class NotificationDelete(DestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    lookup_field = 'pk'

    def destroy(self, *args, **kwargs):
        serializer = NotificationSerializer
        super().destroy(*args, **kwargs)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class NotificationRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    def get_object(self):
        instance = super().get_object()

        if instance.application_id is not None and instance.comment_or_reply_id is not None:
            # new application comment
            return redirect('comments-detail', application_id=instance.application_id, pk=instance.comment_or_reply_id)
        elif instance.application_id is not None:
            # new application
            return redirect('application-detail', pk=instance.application_id)
        elif instance.shelter_id is not None and instance.comment_or_reply_id is not None:
            # new reply to review
            return redirect('review-replies-detail', shelter_id=instance.shelter_id, review_id=instance.review_id, pk=instance.comment_or_reply_id)
        else:
            # new review
            return redirect('reviews-detail', shelter_id=instance.shelter_id, pk=instance.review_id)
        
    
    def destroy(self, *args, **kwargs):
        serializer = NotificationSerializer
        super().destroy(*args, **kwargs)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def update(self, request):
        instance = self.get_object()
        instance.is_read = request.data.get("is_read")
        if (instance.is_read == 'true'):
            instance.is_read = True
        else:
            instance.is_read = False
        instance.save()

        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)
    
