from django.db import models
from accounts.models import User, ShelterProfile
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.validators import MaxValueValidator, MinValueValidator 


class Pet(models.Model):
    MALE = "male"
    FEMALE = "female"
    GENDER_CHOICES = [
        (MALE, "Male"),
        (FEMALE, "Female")
    ]

    AVAILABLE = "available"
    ADOPTED = "adopted"
    PENDING = "pending"
    WITHDRAWN = "withdrawn"
    STATUS_CHOICES = [
        (AVAILABLE, "Available"),
        (ADOPTED, "Adopted"),
        (PENDING, "Pending"),
        (WITHDRAWN, "Withdrawn"),
    ]

    name = models.CharField(max_length=200)
    shelter = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)
    breed = models.CharField(max_length=200)
    age = models.PositiveIntegerField()
    size = models.PositiveIntegerField()
    color = models.CharField(max_length=200)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    # description includes medical history, behaviour, and any special needs or requirements
    description = models.CharField(max_length=400)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, blank=True, default=AVAILABLE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class PetImage(models.Model):
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='pet_images/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.pet.name}"


# Shelter comments are reviews, application comments are chats
class Comment(models.Model):
    # content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE) # user (shelter) - topic is review, application - comment
    # object_id = models.PositiveIntegerField()
    # content_object = GenericForeignKey("content_type", "object_id") # user

    # other comment fields
    commenter = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], null=True, blank=True)
    body = models.CharField(max_length=400)
    shelter = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    application = models.ForeignKey('Application', on_delete=models.CASCADE, null=True, blank=True)
    creation_time = models.DateTimeField(auto_now_add=True)

# class Reply(models.Model):
#     content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
#     object_id = models.PositiveIntegerField()
#     content_object = GenericForeignKey('content_type', 'object_id')

#     body = models.CharField(max_length=400)
#     creation_date = models.DateTimeField(auto_now_add=True)

class Application(models.Model):
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name="pet")
    applicant = models.ForeignKey(User, on_delete=models.CASCADE, related_name="applicant")
    status = models.CharField(max_length=200)
    shelter = models.ForeignKey(User, on_delete=models.CASCADE, related_name="shelter")
    comments = GenericRelation(Comment)
    lastupdated = models.DateTimeField(auto_now=True)