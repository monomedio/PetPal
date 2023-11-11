
# from rest_framework import serializers

# from accounts.models import User


# class seekerSerializer(serializers.ModelSerializer):

#     password2 = serializers.CharField(style={'input_type': 'password'}, write_only = True)
    
#     class Meta:
#         model = User
#         fields = ['is_shelter', 'profile_pic', 'first_name','last_name', 'email', 'phone', 'password', 'password2', 'username']
#         extra_kwargs = {
#             'password': {'write_only': True},
#             'first_name': {'required': True}, 
#             'last_name': {'required': True},
#             'email': {'required': True},
#             'phone': {'required': True},
#             'username': {'required': True},
#         }

#     def save(self): 

#         seeker = User(
#             username = self.validated_data['username'],
#             email = self.validated_data['email'],
#             first_name = self.validated_data['first_name'],
#             last_name = self.validated_data['last_name'],
#             phone = self.validated_data['phone'],
#             is_shelter = False,
#         )
#         password = self.validated_data['password']
#         password2 = self.validated_data['password2']

#         if password != password2: 
#             raise serializers.ValidationError({"password": 'Passwords must match'})
#         seeker.set_password(password)
#         seeker.save()
#         return seeker

from rest_framework import serializers
# from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

from django.contrib.auth import get_user_model

from rest_framework import serializers
from ..models import User, ShelterProfile




User = get_user_model()

class seekerSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['is_shelter', 'first_name', 'last_name', 'email', 'phone', 'password', 'password2', 'username']
        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'required': True}, 
            'last_name': {'required': True},
            'email': {'required': True},
            'phone': {'required': True},
            'username': {'required': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        password2 = validated_data.pop('password2', None)

        validated_data['is_shelter'] = False

        if password != password2:
            raise serializers.ValidationError({"password": "Passwords must match."})

        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        password2 = validated_data.pop('password2', None)

        if password is not None:
            if password != password2:
                raise serializers.ValidationError({"password": "Passwords must match."})
            instance.set_password(password)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance





class shelterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = ShelterProfile
        fields = ['is_shelter', 'first_name', 'last_name', 'email', 'phone', 'password', 'password2', 'username']
        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'required': True}, 
            'last_name': {'required': True},
            'email': {'required': True},
            'phone': {'required': True},
            'username': {'required': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        password2 = validated_data.pop('password2', None)

        validated_data['is_shelter'] = False

        if password != password2:
            raise serializers.ValidationError({"password": "Passwords must match."})

        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        password2 = validated_data.pop('password2', None)

        if password is not None:
            if password != password2:
                raise serializers.ValidationError({"password": "Passwords must match."})
            instance.set_password(password)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance


# class shelterSerializer(serializers.ModelSerializer):
#     password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
#     is_shelter = serializers.SerializerMethodField()
#     first_name = serializers.SerializerMethodField()
#     email = serializers.SerializerMethodField()
#     phone = serializers.SerializerMethodField()
#     password = serializers.SerializerMethodField()
#     username = serializers.SerializerMethodField()
    

#     class Meta:
#         model = ShelterProfile
#         fields = ['is_shelter', 'first_name', 'charity_id', 'address', 'email', 'phone', 'password', 'password2', 'username']
#         extra_kwargs = {
#             'password': {'write_only': True},
#             'first_name': {'required': True}, 
#             'charity_id': {'required': True},
#             'address': {'required': True},
#             'email': {'required': True},
#             'phone': {'required': True},
#             'username': {'required': True},
#         }

#     def get_is_shelter(self, obj):
#         return obj.user.is_shelter
    
#     def get_first_name(self, obj):
#         return obj.user.first_name
    
#     def get_email(self, obj):
#         return obj.user.email
    
#     def get_phone(self, obj):
#         return obj.user.phone
    
#     def get_password(self, obj):
#         return obj.user.password
    
#     def get_username(self, obj):
#         return obj.user.username

# class middleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ShelterProfile
#         fields = ['address', 'charity_id']

# class shelterSerializer(serializers.ModelSerializer):
#     user = seekerSerializer()
#     shelter_profile = middleSerializer()

#     class Meta:
#         model = User  # Assuming User is the main model to serialize
#         fields = ['user', 'shelter_profile']

#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         password2 = validated_data.pop('password2', None)
#         user_data = validated_data.pop('user')

#         validated_data['is_shelter'] = True

#         if password != password2:
#             raise serializers.ValidationError({"password": "Passwords must match."})

#         user = User(**validated_data)
#         user.set_password(password)
#         user.save()
#         return user



#     # class Meta:
#     #     model = ShelterProfile
#     #     fields = ['user', 'is_shelter', 'first_name', 'charity_id', 'address', 'email', 'phone', 'password', 'password2', 'username']

    
#     # def create(self, validated_data):
#     #     password = validated_data.pop('password', None)
#     #     password2 = validated_data.pop('password2', None)

#     #     validated_data['is_shelter'] = True

#     #     if password != password2:
#     #         raise serializers.ValidationError({"password": "Passwords must match."})

#     #     user = User(**validated_data)
#     #     user.set_password(password)
#     #     user.save()
#     #     return user

#     def update(self, instance, validated_data):
#         password = validated_data.pop('password', None)
#         password2 = validated_data.pop('password2', None)

#         if password is not None:
#             if password != password2:
#                 raise serializers.ValidationError({"password": "Passwords must match."})
#             instance.set_password(password)

#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)

#         instance.save()
#         return instance