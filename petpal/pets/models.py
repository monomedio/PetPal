from django.db import models
from accounts.models import User, Comment, ShelterProfile
from django.contrib.contenttypes.fields import GenericRelation


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


class Application(models.Model):
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)
    applicant = models.ForeignKey(User, on_delete=models.CASCADE, related_name="applicant_applications")
    status = models.CharField(max_length=200)
    shelter = models.ForeignKey(User, on_delete=models.CASCADE, related_name="shelter_applications")
    comments = GenericRelation(Comment)
