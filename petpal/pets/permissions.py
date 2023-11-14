from rest_framework import permissions
from django.shortcuts import get_object_or_404
from .models import Pet

SAFE_OPTIONS = ["GET", "HEAD", "OPTIONS"]


class IsOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        # print(f"{request.method}")
        if request.method == "GET":
            return True
        if not request.user.is_shelter:
            return request.method in SAFE_OPTIONS
        # Assume user is now a shelter
        pet = get_object_or_404(Pet, id=view.kwargs.get('pet_id'))
        return pet.shelter == request.user

    def has_object_permission(self, request, view, obj):
        if request.method in ["PUT", "DELETE", "PATCH"]:
            return obj.pet.shelter == request.user
        return True


class IsShelter(permissions.BasePermission):
    def has_permission(self, request, view):
        # print(f"{request.method}")
        if request.method not in SAFE_OPTIONS:
            return request.user.is_shelter
        return True

    def has_object_permission(self, request, view, obj):
        if request.method in ["PUT", "DELETE", "PATCH"]:
            # change if pet shelter field is changed to user object
            return request.user == obj.shelter
        return True
