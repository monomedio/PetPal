# from requests import request
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.views import APIView
from accounts.serializers import userSerializer, shelterSerializer
from accounts.models import User, ShelterProfile
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from rest_framework import viewsets
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from rest_framework.parsers import MultiPartParser
from django.urls import reverse
from django.shortcuts import redirect


class RegistrationUpdateView(APIView):
    parser_classes = (MultiPartParser,)

    def get_serializer_class(self):
        user_type = self.kwargs.get('user_type', 'default')
        if user_type == 'shelter':
            return shelterSerializer
        else:
            return userSerializer

    def get_object(self):
        user_type = self.kwargs.get('user_type', 'default')
        is_shelter = self.request.user.is_shelter

        if user_type == 'seeker' and not is_shelter:
            print(self.request.user)
            return self.request.user
        elif user_type == 'shelter' and is_shelter:
            return self.request.user.shelter_profile
        else:
            raise PermissionDenied("You are not authorized to edit this profile")

    def post(self, request, *args, **kwargs):
        # user_type = self.kwargs.get('user_type', 'default')
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    def put(self, request, *args, **kwargs):
        # Update logic
        user_type = self.kwargs.get('user_type', 'default')
        print(user_type)
        self.check_permissions(request)

        instance = self.get_object()
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    def get_permissions(self):
        if self.request.method == 'PUT':
            return [IsAuthenticated()]
        return []


class ProfileView(APIView):

    def get(self, request):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = userSerializer(request.user)
        return Response(serializer.data)


class ShelterProfileView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = ShelterProfile.objects.all()
    serializer_class = shelterSerializer


class AllShelters(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = ShelterProfile.objects.all()
    serializer_class = shelterSerializer

# class RegistrationView(CreateAPIView):
#     permission_classes = [AllowAny]
#     authentication_classes = []
#     def get_serializer_class(self):
#         user_type = self.kwargs.get('user_type', 'default')
#         if user_type == 'shelter':
#             return shelterSerializer
#         else:
#             return userSerializer


#     def create(self, request, *args, **kwargs):
#         user_type = self.kwargs.get('user_type', 'default')


#         if user_type == 'seeker':
#             serializer_class = userSerializer
#             serializer = serializer_class(data=request.data)

#         else:
#             serializer_class = shelterSerializer
#             serializer = serializer_class(data=request.data)

#         if serializer.is_valid():
#             account = serializer.save()
#             user_id = account.id
#             if user_type == 'seeker': 
#                 data = {
#                     "response": "Success",
#                     "user_id": user_id,
#                     "username": account.username,
#                     "email": account.email,
#                     "first_name": account.first_name,
#                     "last_name": account.last_name,
#                     "phone": account.phone,
#                     "is_shelter": account.is_shelter
#                 }
#             else: 
#                 print(serializer)
#                 data = {
#                     "response": "Success",
#                     "user_id": account.user.id,  
#                     "username": account.user.username, 
#                     "shelter_name": account.user.first_name, 
#                     "charity_id": account.charity_id,
#                     "address": account.address,
#                     "email": account.user.email,  
#                     "phone": account.user.phone,
#                     "is_shelter": account.user.is_shelter 
#                 }

#             return Response(data)
#         else:
#             return Response(serializer.errors)


# from rest_framework import status
# from django.contrib.auth import update_session_auth_hash

# class UpdateView(generics.RetrieveUpdateAPIView):

#     def get_serializer_class(self):
#         user_type = self.kwargs.get('user_type', 'default')
#         if user_type == 'seeker':
#             return userSerializer
#         else:
#             return shelterSerializer

#     # serializer_class = get_serializer_class
#     permission_classes = [IsAuthenticated]


#     def get_object(self):
#         user_type = self.kwargs.get('user_type', 'default')

#         is_shelter = self.request.user.is_shelter

#         if user_type == 'seeker' and not is_shelter:
#             return self.request.user
#         elif user_type == 'shelter' and is_shelter:
#             return self.request.user.shelter_profile
#         else:
#             raise PermissionDenied("You are not authorized to edit this profile")

#     def update(self, request, *args, **kwargs):
#         kwargs['partial'] = True 
#         return super().update(request, *args, **kwargs)

class ReviewViewSet(viewsets.ModelViewSet):
    def get(self, request, *args, **kwargs):
            return redirect(reverse('comments'))