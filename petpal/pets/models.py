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
    PENDING = "pending"
    ACCEPTED = "accepted"
    DENIED = "denied"
    WITHDRAWN = "withdrawn"
    STATUS_CHOICES = [
        (PENDING, "Pending"),
        (ACCEPTED, "Accepted"),
        (DENIED, "denied"),
        (WITHDRAWN, "Withdrawn"),
    ]
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name="pet")
    applicant = models.ForeignKey(User, on_delete=models.CASCADE, related_name="applicant")
    status = models.CharField(default=PENDING, max_length=200, choices=STATUS_CHOICES, blank=True)
    shelter = models.ForeignKey(User, on_delete=models.CASCADE, related_name="shelter")
    comments = GenericRelation(Comment)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)