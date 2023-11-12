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

class Application(models.Model):
	pet = models.ForeignKey(Pet, on_delete=models.CASCADE)
	applicant =  models.ForeignKey(User, on_delete=models.CASCADE)
	status = models.CharField(max_length=200)
	shelter = models.ForeignKey(ShelterProfile, on_delete=models.CASCADE)
	comments = GenericRelation(Comment)
