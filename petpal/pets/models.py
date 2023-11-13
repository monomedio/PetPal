from django.db import models
from accounts.models import User, Comment, ShelterProfile
from django.contrib.contenttypes.fields import GenericRelation

class Pet(models.Model):
    shelter = models.ForeignKey(ShelterProfile, on_delete=models.CASCADE)
    breed = models.CharField(max_length=200)
    age = models.PositiveIntegerField()
    size = models.PositiveIntegerField()
    color = models.CharField(max_length=200)
    gender = models.CharField(max_length=200)
    description = models.CharField(max_length=400)
    photo = models.ImageField()
    status = models.CharField(default='Available', max_length=200)

class Application(models.Model):
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name="pet")
    applicant =  models.ForeignKey(User, on_delete=models.CASCADE, related_name="applicant")
    status = models.CharField(max_length=200)
    shelter = models.ForeignKey(User, on_delete=models.CASCADE, related_name="shelter")
    comments = GenericRelation(Comment)
    lastupdated = models.DateTimeField(auto_now=True)
