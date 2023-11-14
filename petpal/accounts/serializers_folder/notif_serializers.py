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

from rest_framework import serializers
from accounts.models import User, Notification
from rest_framework.generics import CreateAPIView, RetrieveAPIView, ListAPIView, UpdateAPIView, DestroyAPIView

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        read_only_fields = ['message', 'url', 'timestamp', 'user']

class NotificationUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

    # def create(self, validated_data):
    #     if 'is_read' not in validated_data:
    #         raise serializers.ValidationError({'is_read': 'This field is required during creation.'})
    #     if 'message' not in validated_data:
    #         raise serializers.ValidationError({'message': 'This field is required during creation.'})
    #     if 'timestamp' not in validated_data:
    #         raise serializers.ValidationError({'timestamp': 'This field is required during creation.'})
    #     if 'icon' not in validated_data:
    #         raise serializers.ValidationError({'icon': 'This field is required during creation.'})
    #     if 'user' not in validated_data:
    #         raise serializers.ValidationError({'user': 'This field is required during creation.'})

    #     return super().create(validated_data)
    
# class Notification(models.Model):
#     is_read = models.BooleanField(default=False)
#     message = models.TextField()
#     timestamp = models.DateTimeField(auto_now_add=True)
#     icon = models.ImageField()
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
    