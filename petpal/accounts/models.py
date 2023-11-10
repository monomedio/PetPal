from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericRelation, GenericForeignKey
from django.contrib.contenttypes.models import ContentType



class User(AbstractUser):
    # set AUTH_USER_MODEL = "myapp.User" in settings.py
    phone = models.CharField(max_length=200)
    is_shelter = models.BooleanField(default=False)
    profile_pic = models.ImageField



# Shelter comments are reviews, application comments are chats
class Comment(models.Model):
    commenter = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=400)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")
    creation_date = models.DateTimeField()


class ShelterProfile(models.Model):
    user = models.OneToOneField('User', related_name="shelter_profile", on_delete=models.CASCADE)
    address = models.CharField(max_length=200)
    reviews = GenericRelation(Comment)
    description = models.CharField(max_length=400)
    charity_id = models.PositiveIntegerField(unique=True)
    hours = models.CharField(max_length=400)
