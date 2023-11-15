# from requests import Response, request
from rest_framework import serializers

from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

from rest_framework import serializers
from .models import User, ShelterProfile
from rest_framework import status

User = get_user_model()


class userSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['is_shelter', 'first_name', 'last_name', 'email', 'phone', 'password', 'password2', 'username', 'profile_pic']
        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True},
            'phone': {'required': True},
            'username': {'required': True},
            'profile_pic': {'required': False},
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        password2 = validated_data.pop('password2', None)

        validated_data['is_shelter'] = False

        if password != password2:
            raise serializers.ValidationError({"password": "Passwords must match."})

        print("IS THIS IN HERE")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        password2 = validated_data.pop('password2', None)

        print("IS THIS IN HERE")

        if password is not None:
            if password != password2:
                raise serializers.ValidationError({"password": "Passwords must match."})
            instance.set_password(password)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance


class shelterSerializer(serializers.ModelSerializer):
    class excludeAndAddSerializer(userSerializer):

        shelter_name = serializers.CharField(source='first_name')

        class Meta(userSerializer.Meta):
            fields = ['is_shelter', 'shelter_name', 'email', 'phone', 'password', 'password2', 'username', 'profile_pic']

        # def to_representation(self, instance):
        #     ret = super().to_representation(instance)
        #     # Replace 'first_name' with 'shelter_name' in the output
        #     ret['shelter_name'] = ret.pop('first_name', None)
        #     return ret

        # def to_internal_value(self, data):
        #     # Map 'shelter_name' to 'first_name' in the input
        #     if 'shelter_name' in data:
        #         data['first_name'] = data.pop('shelter_name')
        #     return super().to_internal_value(data)

    user = excludeAndAddSerializer()

    # user = userSerializer()

    class Meta:
        model = ShelterProfile
        fields = ['charity_id', 'address', 'user']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        print(user_data)
        password = user_data.pop('password')
        password2 = user_data.pop('password2')

        user_data['is_shelter'] = True

        if password != password2:
            raise serializers.ValidationError({"password": "Passwords must match."})

        user = User.objects.create(**user_data)
        print(user)
        user.set_password(password)
        user.save()

        shelter_profile = ShelterProfile.objects.create(user=user, **validated_data)
        print(shelter_profile)
        return shelter_profile

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {}) 

        password = validated_data.pop('password', None)
        password2 = validated_data.pop('password2', None)

        user_instance = instance.user


        if password is not None:
            if password != password2:
                raise serializers.ValidationError({"password": "Passwords must match."})
            instance.set_password(password)
        

        # Updating the nested user stuff
        for attr, value in user_data.items():
            setattr(user_instance, attr, value)
        user_instance.save()

        # Updating the outter shelter stuff
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
