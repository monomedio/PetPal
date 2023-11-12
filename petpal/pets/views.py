from .models import Pet, Application
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import PetSerializer, ApplicationSerializer


class PetViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows pets to be viewed or edited.
    """
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [permissions.IsAuthenticated]

#     class StoresManage(APIView):
# def get(self, request):
# stores = Store.objects.all()
# return Response([
# {
# 'name' : store.name,
# 'url' : store.url,
# }
# for store in stores ])



class ApplicationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows applications to be viewed or edited.
    """
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]
