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
        read_only_fields = ['pet', 'applicant', 'shelter', 'comments']

class ApplicationUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['status']
