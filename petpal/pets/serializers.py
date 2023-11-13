from rest_framework import serializers
from .models import Pet, Application


class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        exclude = ["shelter"]


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['pet', 'applicant', 'status', 'shelter', 'comments']
