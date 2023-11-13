from .models import Pet, Application
from rest_framework import viewsets, mixins
from rest_framework import permissions
from .serializers import PetSerializer, ApplicationSerializer


class PetViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.    
    """
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [permissions.IsAuthenticated]


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
