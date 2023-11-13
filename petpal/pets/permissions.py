from rest_framework import permissions

SAFE_OPTIONS = ["GET", "HEAD", "OPTIONS"]


class IsShelter(permissions.BasePermission):
    def has_permission(self, request, view):
        # print(f"{request.method}")
        if request.method not in SAFE_OPTIONS:
            return request.user.is_shelter
        return True

    def has_object_permission(self, request, view, obj):
        if request.method in ["PUT", "DELETE"]:
            # change if pet shelter field is changed to user object
            return request.user == obj.shelter
        return True
