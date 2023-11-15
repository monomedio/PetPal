from accounts.models import Notification, User
from pets.models import Application, Comment, Reply
from rest_framework import permissions, serializers
from rest_framework.permissions import AllowAny, IsAuthenticated
from accounts.serializers_folder.notif_serializers import NotificationSerializer
from rest_framework.generics import CreateAPIView, RetrieveAPIView, ListAPIView, UpdateAPIView, DestroyAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404, redirect
from rest_framework import status
# Notifications (16 marks)
# Model (2 marks) 
# Create (2 marks)
# Note that you do not have to provide this endpoint IF your other actions will create notification objects directly.
# E.g., notification created as part of creating a new comment for a shelter.
# Update (1 mark)
# You should only be able change the state of a notification from "unread" to "read".
# It is fine to not do the above, but instead make a notification read the first time it is retrieved.
# List (6 marks)
# Users (shelter and seeker) can only view their own notifications (1 mark)
# Sort notifications by creation time (2 mark)
# Filter notifications by read/unread (2 mark)
# Pagination support (1 mark)
# Delete (1 mark)
# Get (4 mark)
# Should provide a link to the associated model
# Link to new comment added (2 marks)
# Link to application creation and status update (2 marks)

#add body request for notif sorting, paginate

class NotificationCreate(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def perform_create(self, serializer, *args, **kwargs):
        if "application_id" in self.request.data and not "comment_or_reply_id" in self.request.data:
            # Status change
            application_id = self.request.data.get('application_id')
            application = get_object_or_404(Application, id=application_id)
            message = 'Your application for ' + application.pet.name + ' has changed to the status: ' + application.status + '.'
        elif "application_id" in self.request.data:
            # new application comment
            application_id = self.request.data.get('application_id')
            comment_id = self.request.data.get('comment_or_reply_id')
            application = get_object_or_404(Application, id=application_id)
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
            message = 'You have a new reply to a review.'
        elif "shelter_id" in self.request.data and "review_id" in self.request.data:
            # new review
            review_id = self.request.data.get('review_id')
            shelter_id = self.request.data.get('shelter_id')
            shelter = get_object_or_404(User, id=shelter_id)
            review = get_object_or_404(Comment, shelter=shelter, id=review_id)
            message = 'You have a new review!'
        else:
            return Response('Ids for relevant models should be provided')

        serializer.save(user=self.request.user, message=message)

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
        user_id = self.request.user.id
        queryset = Notification.objects.all()
        queryset = Notification.objects.filter(user=user_id)

        if (self.request.data.get("display_is_read")):
            queryset = queryset.filter(is_read=True)
        else:
            queryset = queryset.filter(is_read=False)

        return queryset.order_by('-timestamp')
    
    # class Notification(models.Model):
    # is_read = models.BooleanField(default=False)
    # message = models.TextField()
    # timestamp = models.DateTimeField(auto_now_add=True)
    # icon = models.ImageField()
    # user = models.ForeignKey(User, on_delete=models.CASCADE)

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
        # application_id = models.IntegerField(null=True, blank=True)
        # shelter_id = models.IntegerField(null=True, blank=True)
        # reply_id = models.IntegerField(null=True, blank=True)
        # comment_or_reply_id = models.IntegerField(null=True, blank=True) # If null, notif should link to status update

        # if (self.request.application_id and self.request.shelter_id) or (self.request.application_id and self.request.reply_id) or (self.request.reply_id and self.request.shelter_id):
        #     return Response('Only one application, shelter, or reply id should be provided.')
        # elif (self.request.application_id is not None and self.request.comment_or_reply_id is None):
        #     # Status change
        #     return redirect('comments', pk=self.request.application_id)

        return get_object_or_404(Notification, id=self.kwargs['pk'])
    
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
    
