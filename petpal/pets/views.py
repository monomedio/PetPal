from .models import Pet, Application
from rest_framework import viewsets, permissions, mixins
from rest_framework.response import Response
from .serializers import PetSerializer, ApplicationSerializer, ApplicationUpdateSerializer
from rest_framework.filters import OrderingFilter, SearchFilter
from .permissions import IsShelter, ApplicationPermissions
from django.shortcuts import get_object_or_404


class PetViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.    
    """
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [permissions.IsAuthenticated, IsShelter]
    filter_backends = [OrderingFilter]
    ordering_fields = ["name", "size", "age", "created_at", "updated_at"]

    def perform_create(self, serializer):
        serializer.validated_data["shelter"] = self.request.user
        serializer.save()

    def get_queryset(self):
        queryset = self.filter_queryset(super().get_queryset())
        if self.request.method == "GET":
            filters = self.request.GET
            print(filters)
            # status filter defaults to available if unspecified
            if "status" not in filters:
                queryset = queryset.filter(status=Pet.AVAILABLE)

            # apply filters
            for field, value in filters.items():
                if field == "ordering":
                    pass
                    # TODO: shelter filtering
                elif field == "shelter":
                    pass
                elif field == "location":
                    field = "shelter__shelter_profile__address__iexact"
                    queryset = queryset.filter(**{field: value})
                else:
                    field = f"{field}__iexact"
                    queryset = queryset.filter(**{field: value})
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        # pagination and response
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ApplicationViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions. 

    List Applications: GET /applications/
    Retrieve a Single Application: GET /applications/{pk}/
    Create an Application: POST /applications/
    Send a POST request with the application data in the request body.
    Update an Application: PUT /applications/{pk}/
    Send a PUT or PATCH request with the updated application data in the request body.
    Delete an Application: DELETE /applications/{pk}/

    Applications (18 marks)
    ✅ Deleting an application is not allowed (unless it was deleted as a part of deleting its associated pet listing)
    ✅ Model (2 marks) 
    Create (4 marks)
    ✅ Can only create applications for a pet listing that is "available"
    Update (3 marks)
    ✅ Details of an application cannot be updated once submitted/created, except for its status (see below).
    ✅ Shelter can only update the status of an application from pending to accepted or denied.
    ✅ Pet seeker can only update the status of an application from pending or accepted to withdrawn.
    List (7 marks)
    ✅ Shelters can only view their own applications, not that of other shelters.
    ✅ Filter applications by status (2 marks)
    ✅ Sort application by creation time and last update time (4 marks)
    When an application receives a new comment, its "last update time" should be changed.
    ✅ Pagination support (1 mark)
    ✅ Get (2 marks)
    """
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated, ApplicationPermissions]
    filter_backends = [OrderingFilter]
    ordering_fields = ['created_at', 'updated_at']

    def create(self, request, *args, **kwargs):
        if "pet_id" not in request.data:
            return Response("pet_id is required.", status=400)
        pet_id = request.data["pet_id"]
        pet = get_object_or_404(Pet, id=pet_id)

        request.data["pet"] = pet
        request.data["applicant"] = request.user
        request.data["shelter"] = pet.shelter

        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        # by default, PATCHing to /applications/1/ will patch application with id1
        if "status" in request.data:
            application_id = request.path_info.split("/")[0]
            application = get_object_or_404(Application, id=application_id)

            # Shelter can only update the status of an application from pending to accepted or denied.
            if request.user.is_shelter and (
                application.status == Application.PENDING and (
                request.data["status"] == Application.ACCEPTED or request.data["status"] == Application.DENIED)):
                super().update(request, *args, **kwargs)
            # Pet seeker can only update the status of an application from pending or accepted to withdrawn.
            elif not request.user.is_shelter and (
                application.status == Application.PENDING and (
                request.data["status"] == Application.ACCEPTED or request.data["status"] == Application.WITHDRAWN)):
                super().update(request, *args, **kwargs)
                
            else:    
                return Response("Cannot update status of application.", status=400)
        else:    
            return Response("status: required field", status=400)

    def get_queryset(self):
        queryset = super().get_queryset()

        # only allow owned applications
        if self.request.user.is_shelter:
            queryset = queryset.filter(shelter=self.request.user)
        else:
            queryset = queryset.filter(applicant=self.request.user)

        query_parms = self.request.GET
        if "status" in query_parms:
            queryset = queryset.filter(status=query_parms["status"])

        return queryset
