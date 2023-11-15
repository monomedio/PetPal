from rest_framework import serializers
from .models import Pet, Application, PetImage, Comment


class PetImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetImage
        fields = ["image"]
        read_only_fields = ["id"]


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

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        exclude = ['creation_time']
        read_only_fields = ['commenter', 'creation_time']

