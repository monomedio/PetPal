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
    commenter = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], null=True, blank=True)
    body = models.CharField(max_length=1000)
    shelter = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='review')
    application = models.ForeignKey('Application', on_delete=models.CASCADE, null=True, blank=True, related_name='application_message')
    creation_time = models.DateTimeField(auto_now_add=True)

class Reply(models.Model):
    commenter = models.ForeignKey(User, on_delete=models.CASCADE)
    review = models.ForeignKey(Comment, on_delete=models.CASCADE)
    body = models.CharField(max_length=400)
    creation_time = models.DateTimeField(auto_now_add=True)

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


class Donate(models.Model):
    ONE_TIME = "one_time"
    MONTHLY = "monthly"
    QUARTERLY = "quarterly"
    YEARLY = "yearly"
    STATUS_DONATE = [
        (ONE_TIME, "one_time"),
        (MONTHLY, "monthly"),
        (QUARTERLY, "quarterly"),
        (YEARLY, "yearly"),
    ]
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)
    amount = models.PositiveIntegerField()
    frequency = models.CharField(default=ONE_TIME, max_length=200, choices=STATUS_DONATE, blank=True)
    comment = models.CharField(max_length=1000)
    credit_card = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
