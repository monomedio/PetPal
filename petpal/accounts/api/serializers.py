from rest_framework import serializers

from accounts.models import User


class seekerCreateSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(style={'input_type': 'password'}, write_only = True)
    
    class Meta:
        model = User
        fields = ['is_shelter', 'profile_pic', 'first_name','last_name', 'email', 'phone', 'password', 'password2', 'username']
        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'required': True}, 
            'last_name': {'required': True},
            'email': {'required': True},
            'phone': {'required': True},
            'username': {'required': True},
        }

    def save(self): 
        seeker = User(
            username = self.validated_data['username'],
            email = self.validated_data['email'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
            phone=self.validated_data['phone'],
            is_shelter = False,
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2: 
            raise serializers.ValidationError({"password": 'Passwords must match'})
        seeker.set_password(password)
        seeker.save()
        return seeker

