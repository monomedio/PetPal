from .models import Pet, Application, PetImage, Comment
from rest_framework import viewsets, permissions, mixins, status
from rest_framework.response import Response
from .serializers import PetSerializer, ApplicationSerializer, PetImageSerializer, CommentSerializer
from rest_framework.filters import OrderingFilter
from .permissions import IsShelter, ApplicationPermissions, IsOwner
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from django.core.exceptions import ValidationError
from accounts.models import User, ShelterProfile


class PetImageViewSet(viewsets.ModelViewSet):
    queryset = PetImage.objects.all()
    serializer_class = PetImageSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        pet_id = self.kwargs.get('pet_id')
        return PetImage.objects.filter(pet__id=pet_id)

    def create(self, request, *args, **kwargs):
        if len(request.data) == 0:
            return Response("No images provided.", status.HTTP_400_BAD_REQUEST)

        pet_id = self.kwargs.get('pet_id')
        pet = get_object_or_404(Pet, id=pet_id)

        images = request.data.getlist('images')
        image_instances = []

        for image in images:
            image_instance = PetImage(pet=pet, image=image)
            image_instances.append(image_instance)

        PetImage.objects.bulk_create(image_instances)

        # Modify the serializer to include 'id' field
        serializer = self.get_serializer(image_instances, many=True)
        serialized_data = serializer.data

        # Add 'id' field to each image in the response
        for i, image_data in enumerate(serialized_data):
            image_data['id'] = image_instances[i].id

        return Response(serialized_data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        pet_id = self.kwargs.get('pet_id')
        image_id = self.kwargs.get('pk')
        pet_image = get_object_or_404(PetImage, id=image_id, pet__id=pet_id)

        serializer = self.get_serializer(pet_image)
        serialized_data = serializer.data

        # Add 'id' field to the image in the response
        serialized_data['id'] = pet_image.id
        return Response(serialized_data)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        serialized_data = serializer.data

        if len(serialized_data) == 0:
            return Response("This pet has no images.")

        # Add 'id' field to each image in the response
        for i, image_data in enumerate(serialized_data):
            image_data['id'] = queryset[i].id
        return Response(serialized_data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response("Image deleted successfully", status=status.HTTP_204_NO_CONTENT)


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
            # # status filter defaults to available if unspecified
            # if "status" not in filters:
            #     queryset = queryset.filter(status=Pet.AVAILABLE)

            # apply filters
            for field, value in filters.items():
                if field == "ordering":
                    pass
                elif field == "location":
                    field = "shelter__shelter_profile__address__iexact"
                    queryset = queryset.filter(**{field: value})
                elif field == "shelter":
                    field = f"{field}__id__iexact"
                    queryset = queryset.filter(**{field: value})
                else:
                    field = f"{field}__iexact"
                    queryset = queryset.filter(**{field: value})
                # match field:
                #     case "ordering":
                #         pass
                #     case "location":
                #
                #     case "shelter":
                #
                #     case _:

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        # status filter defaults to available if unspecified
        filters = request.GET
        if "status" not in filters:
            queryset = queryset.filter(status=Pet.AVAILABLE)

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

    # def create(self, request, *args, **kwargs):
    #     if "pet_id" not in request.data:
    #         return Response("pet_id is required.", status=400)
    #     pet_id = request.data["pet_id"]
    #     pet = get_object_or_404(Pet, id=pet_id)

    #     serializer = self.get_serializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.validated_data["pet"] = pet
    #         serializer.validated_data["applicant"] = request.user
    #         serializer.validated_data["shelter"] = pet.shelter
    #         serializer.save()
    #     else:
    #         return Response(serializer.errors, status=400)

    #     return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        if "pet_id" not in self.request.data:
            return Response("pet_id is required.", status=400)
        pet_id = self.request.data["pet_id"]
        pet = get_object_or_404(Pet, id=pet_id)

        serializer.save(applicant=self.request.user, pet=pet, shelter=pet.shelter)

    def update(self, request, *args, **kwargs):
        # by default, PATCHing to /applications/1/ will patch application with id1
        if "status" in request.data:
            application_id = request.path_info.split("/")[-2]
            application = get_object_or_404(Application, id=application_id)

            # Shelter can only update the status of an application from pending to accepted or denied.
            if request.user.is_shelter and (
                application.status == Application.PENDING and (
                request.data["status"] == Application.ACCEPTED or request.data["status"] == Application.DENIED)):
                return super().update(request, *args, **kwargs)
            # Pet seeker can only update the status of an application from pending or accepted to withdrawn.
            elif not request.user.is_shelter and (
                (application.status == Application.PENDING or application.status == Application.ACCEPTED) and (
                request.data["status"] == Application.WITHDRAWN)):
                return super().update(request, *args, **kwargs)
            else:    
                # return Response("application.status:{}, request.data['status']:{}".format(application.status, request.data["status"]), status=200)
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

class CommentViewSet(viewsets.ModelViewSet):

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]


    def perform_create(self, serializer):
         permission_classes = [permissions.IsAuthenticated, ApplicationPermissions]
    filter_backends = [OrderingFilter]
    ordering_fields = ['created_at', 'updated_at']

    def perform_create(self, serializer):
        if "pet_id" not in self.request.data:
            return Response("pet_id is required.", status=400)
        pet_id = self.request.data["pet_id"]
        pet = get_object_or_404(Pet, id=pet_id)

        serializer.save(applicant=self.request.user, pet=pet, shelter=pet.shelter)

    def update(self, request, *args, **kwargs):
        # by default, PATCHing to /applications/1/ will patch application with id1
        if "status" in request.data:
            application_id = request.path_info.split("/")[-2]
            application = get_object_or_404(Application, id=application_id)

            # Shelter can only update the status of an application from pending to accepted or denied.
            if request.user.is_shelter and (
                application.status == Application.PENDING and (
                request.data["status"] == Application.ACCEPTED or request.data["status"] == Application.DENIED)):
                return super().update(request, *args, **kwargs)
            # Pet seeker can only update the status of an application from pending or accepted to withdrawn.
            elif not request.user.is_shelter and (
                (application.status == Application.PENDING or application.status == Application.ACCEPTED) and (
                request.data["status"] == Application.WITHDRAWN)):
                return super().update(request, *args, **kwargs)
            else:    
                # return Response("application.status:{}, request.data['status']:{}".format(application.status, request.data["status"]), status=200)
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

class CommentViewSet(viewsets.ModelViewSet):

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]
    paginate_by = 5

    def perform_create(self, serializer):
        if 'shelter_id' in self.request.data:
            # shelter is not NULL, then the comment is a review/reply to a review
            shelter_id = self.request.data["shelter_id"]
            shelter = get_object_or_404(User, id=shelter_id)
            
            serializer.save(commenter=self.request.user, shelter=shelter)

        elif 'application_id' in self.request.data:
        # application is not NULL, then the comment is an comment on an application
            app_id = self.request.data["application_id"]
            application = get_object_or_404(Application, id=app_id)
        
        # Make sure that the logged in user is allowed to comment on the application
            logged_in_user = self.request.user
            if (logged_in_user== application.applicant or logged_in_user == application.shelter):
                serializer.save(commenter=self.request.user, application=application, rating=None)
            else:
                return Response('Current user not associated with this application.')
        else:
            # Not working? idk why
            return Response('Either a shelter or application id must be provided.')

    def list(self, request, *args, **kwargs):

        def get_queryset(self):
            queryset = Comment.objects.all()
            return queryset.order_by('creation_time')