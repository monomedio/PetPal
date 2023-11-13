from accounts.models import Notification
from rest_framework import permissions, serializers
from .notif_serializers import NotificationSerializer
from rest_framework.generics import CreateAPIView, RetrieveAPIView, ListAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
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

class NotificationCreate(CreateAPIView):
    """
    API endpoint to be called by the frontend once a notification should be created.
    """
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class NotificationUpdate(UpdateAPIView):
    """
    Update whether a notification is read or not.
    """
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
    # we allow the user to switch the owner to someone else
    serializer_class = NotificationSerializer
    paginate_by = 5

    def get_queryset(self):
        user_id = self.request.user.id
        queryset = Notification.objects.all()
        queryset = queryset.filter(is_read=False)
        # Test below once login is implemented
        # queryset = Notification.objects.filter(user=user_id)
        return queryset.order_by('-timestamp')
    
    # class Notification(models.Model):
    # is_read = models.BooleanField(default=False)
    # message = models.TextField()
    # timestamp = models.DateTimeField(auto_now_add=True)
    # icon = models.ImageField()
    # user = models.ForeignKey(User, on_delete=models.CASCADE)

class NotificationDelete(DestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    lookup_field = 'pk'

class NotificationRetrieve(RetrieveAPIView):
    # might need reverse lazy
    pass