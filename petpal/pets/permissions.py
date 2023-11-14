from rest_framework import permissions

SAFE_OPTIONS = ["GET", "HEAD", "OPTIONS"]


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


# class IsSeeker(permissions.BasePermission):
#     def has_permission(self, request, view):
#         # print(f"{request.method}")
#         if request.method not in SAFE_OPTIONS:
#             return not request.user.is_shelter
#         return True

#     def has_object_permission(self, request, view, obj):
#         if request.method in ["PUT", "DELETE", "PATCH"]:
#             # change if pet shelter field is changed to user object
#             return request.user == obj.seeker
#         return True

class ApplicationPermissions(permissions.BasePermission):
    """
    Shelter can only update the status of an application from pending to accepted or denied.
    Pet seeker can only update the status of an application from pending or accepted to withdrawn.
    """

    def has_permission(self, request, view):
        if request.method in ["PUT", "DELETE"]:
            return False
        elif request.method == "POST":
            return not request.user.is_shelter
        return True

    def has_object_permission(self, request, view, obj):
        if request.method in ["PATCH", "GET"]:
            return request.user == obj.shelter or request.user == obj.applicant
        return True
