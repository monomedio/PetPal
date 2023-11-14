from .models import Pet, Application
from rest_framework import viewsets, permissions, mixins
from rest_framework.response import Response
from .serializers import PetSerializer, ApplicationSerializer, ApplicationUpdateSerializer
from rest_framework.filters import OrderingFilter, SearchFilter
from .permissions import IsShelter, ApplicationPermissions

class PetViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.    
    """
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsShelter]
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
                if field == "shelter":
                    pass
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
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['status']
    ordering_fields = ['created_at', 'updated_at']

    def create(self, request, *args, **kwargs):
        # POST PARAMS: pet_pk, applicant_pk, status, shelter_pk
        pet_pk = request.query_params.get('pet_pk')

        try:
            pet = Pet.objects.get(pk=pet_pk, status='Available')
        except Pet.DoesNotExist:
            return Response({'error': 'Pet not found or not available'}, status=400)

        # Create the application for the available pet
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(pet=pet)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=201, headers=headers)

    def update(self, request, *args, **kwargs):
        serializer = ApplicationUpdateSerialiser(data=request.data)
        return super().update(request, *args, **kwargs)

    def get_queryset(self):
        user = self.request.user
        # If the user is a shelter, return only their applications
        if user.is_shelter:
            return Application.objects.filter(shelter=user)
        # If the user is a seeker, return only their applications
        return Application.objects.filter(applicant=user)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        # You can access the filtered and ordered queryset using self.filter_queryset(queryset)
        queryset = self.filter_queryset(queryset)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

