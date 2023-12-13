from rest_framework import serializers
from .models import Pet, Application, PetImage, Comment, Reply, Donate


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


class DonateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donate
        fields = ["amount", "comment", "frequency", "pet_id", "credit_card"]



class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'pk', 'pet', 'applicant', 'status', 'shelter']
        read_only_fields = ['pet', 'applicant', 'shelter']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ['commenter', 'creation_time', 'shelter', 'application']

class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = '__all__'
        read_only_fields = ['commenter', 'creation_time', 'review']
