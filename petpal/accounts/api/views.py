from requests import request
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.views import APIView
from .serializers import seekerSerializer, shelterSerializer
from accounts.models import User
from rest_framework.permissions import AllowAny


class RegistrationView(CreateAPIView):
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        user_type = self.kwargs.get('user_type', 'default')
        if user_type == 'shelter':
            return shelterSerializer
        else:
            return seekerSerializer
        

    serializer_class = seekerSerializer


    def create(self, request, *args, **kwargs):
        user_type = self.kwargs.get('user_type', 'default')

        if user_type == 'seeker':
            serializer_class = seekerSerializer
            serializer = serializer_class(data=request.data)

        else:
            serializer_class = shelterSerializer
            serializer = serializer_class(data=request.data)

        
        if serializer.is_valid():
            account = serializer.save()
            user_id = account.id
            if user_type == 'seeker': 
                data = {
                    "response": "Success",
                    "user_id": user_id,
                    "username": account.username,
                    "email": account.email,
                    "first_name": account.first_name,
                    "last_name": account.last_name,
                    "phone": account.phone,
                    "is_shelter": account.is_shelter
                }
            else: 
                data = {
                    "response": "Success",
                    "user_id": user_id,
                    "username": account.username,
                    'first': account.shelter_name, 
                    'charity_id': account.charity_id,
                    'address': account.address,
                    'email': account.email,
                    'phone': account.phone,
                    "is_shelter": account.is_shelter
                }

            return Response(data)
        else:
            return Response(serializer.errors)
        
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import update_session_auth_hash

# class UserUpdateView(APIView):
#     def get(self, request):
#         if not request.user.is_authenticated:
#             return Response(status=status.HTTP_401_UNAUTHORIZED)
        
#         serializer = seekerSerializer(request.user)
#         return Response(serializer.data)

#     def put(self, request):
#         if not request.user.is_authenticated:
#             return Response(status=status.HTTP_401_UNAUTHORIZED)

#         serializer = seekerSerializer(request.user, data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             if 'password' in request.data:
#                 user.set_password(request.data['password'])
#                 user.save()
#                 update_session_auth_hash(request, user) 
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import update_session_auth_hash
from .serializers import seekerSerializer

class UserUpdateView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = seekerSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = seekerSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            updated_user = serializer.save()
            if 'password' in request.data:
                update_session_auth_hash(request, updated_user)  # Update session auth if password was changed
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class ProfileView(APIView):
    
    def get(self, request):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = seekerSerializer(request.user)
        return Response(serializer.data)