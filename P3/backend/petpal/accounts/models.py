from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericRelation, GenericForeignKey
from django.contrib.contenttypes.models import ContentType



class User(AbstractUser):
    # set AUTH_USER_MODEL = "myapp.User" in settings.py
    phone = models.CharField(max_length=200)
    is_shelter = models.BooleanField(default=False)
    profile_pic = models.ImageField(upload_to='pfp/', blank=True)



# # Shelter comments are reviews, application comments are chats
# class Comment(models.Model):
#     commenter = models.ForeignKey(User, on_delete=models.CASCADE)
#     description = models.CharField(max_length=400)
#     content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
#     object_id = models.PositiveIntegerField()
#     content_object = GenericForeignKey("content_type", "object_id")
#     creation_date = models.DateTimeField()


class ShelterProfile(models.Model):
    user = models.OneToOneField('User', related_name="shelter_profile", on_delete=models.CASCADE)
    address = models.CharField(max_length=200)
    # reviews = GenericRelation(Comment)
    description = models.CharField(max_length=400)
    charity_id = models.PositiveIntegerField(unique=True)
    hours = models.CharField(max_length=400)

class Notification(models.Model):

    application_id = models.IntegerField(null=True, blank=True)
    shelter_id = models.IntegerField(null=True, blank=True)
    review_id = models.IntegerField(null=True, blank=True)
    comment_or_reply_id = models.IntegerField(null=True, blank=True) # If null, notif should link to status update

    is_read = models.BooleanField(default=False)

    # COMMENT = "comment"
    # APPLICATION = "application"
    # REVIEW = "review"
    # STATUS_CHOICES = [
    #     (COMMENT, "Comment"),
    #     (APPLICATION, "Application"),
    #     (REVIEW, "Review"),
    # ]

    message = models.TextField()
    url = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notif_recipient")