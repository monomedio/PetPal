from rest_framework import serializers
from .models import Pet, Application


class PetSerializer(serializers.ModelSerializer):
    location = serializers.SerializerMethodField()

    class Meta:
        model = Pet
        exclude = ["shelter"]

    def get_location(self, obj):
        return obj.shelter.shelter_profile.address


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['pet', 'applicant', 'status', 'shelter', 'comments']
        read_only_fields = ['pet', 'applicant', 'shelter', 'comments']

class ApplicationUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['status']
