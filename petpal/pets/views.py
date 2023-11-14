from .models import Pet, Application, PetImage
from rest_framework import viewsets, permissions, mixins, status
from rest_framework.response import Response
from .serializers import PetSerializer, ApplicationSerializer, PetImageSerializer
from rest_framework.filters import OrderingFilter
from .permissions import IsShelter, IsOwner
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action


class PetImageViewSet(viewsets.ModelViewSet):
    queryset = PetImage.objects.all()
    serializer_class = PetImageSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        pet_id = self.kwargs.get('pet_id')
        return PetImage.objects.filter(pet__id=pet_id)

    def create(self, request, *args, **kwargs):
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
            # status filter defaults to available if unspecified
            if "status" not in filters:
                queryset = queryset.filter(status=Pet.AVAILABLE)

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

        # pagination and response
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ApplicationViewSet(mixins.CreateModelMixin,
                         mixins.RetrieveModelMixin,
                         mixins.UpdateModelMixin,
                         mixins.ListModelMixin,
                         viewsets.GenericViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions. 

    Applications (18 marks)
    ✅ Deleting an application is not allowed (unless it was deleted as a part of deleting its associated pet listing)
    ✅ Model (2 marks) 
    Create (4 marks)
    ✅ Can only create applications for a pet listing that is "available"
    Update (3 marks)
    ✅ Details of an application cannot be updated once submitted/created, except for its status (see below).
    Shelter can only update the status of an application from pending to accepted or denied.
    Pet seeker can only update the status of an application from pending or accepted to withdrawn.
    List (7 marks)
    Shelters can only view their own applications, not that of other shelters.
    Filter applications by status (2 marks)
    Sort application by creation time and last update time (4 marks)
    When an application receives a new comment, its "last update time" should be changed.
    Pagination support (1 mark)
    Get (2 marks)
    """
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        if request.application.pet is not None and request.application.pet.is_available == 'Available':
            return super().create(request.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        if request.application.status == "pending" and request.user == request.application.shelter:
            return super().update(request, pk)
        elif request.application.status == "pending" and request.user == request.application.applicant:
            return super().update(request, pk)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
