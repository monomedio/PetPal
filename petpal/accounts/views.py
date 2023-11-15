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
from pets.models import Application


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


class SeekerProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if user.is_shelter:

            applications = Application.objects.filter(shelter=user)

            applicant_ids = applications.values_list('applicant', flat=True)
            
            # select all objects where the user_id is in the list applicant_ids.
            applicants = User.objects.filter(id__in=applicant_ids).distinct()

            serializer = userSerializer(applicants, many=True)
            return Response(serializer.data)
        else:
            return Response({"error": "Please log in as a shelter to see applications"}, status=403)