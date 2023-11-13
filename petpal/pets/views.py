from .models import Pet, Application
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import PetSerializer, ApplicationSerializer
from rest_framework.exceptions import PermissionDenied
from .permissions import IsShelter


class PetViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows pets to be viewed or edited.
    """
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsShelter]

    def perform_create(self, serializer):
        serializer.validated_data["shelter"] = self.request.user
        serializer.save()

    def list(self, request, *args, **kwargs):

        filters = request.data
        queryset = self.queryset

        # status filter defaults to available if unspecified
        if "status" not in filters:
            queryset = queryset.filter(status=Pet.AVAILABLE)  # Assign the filtered queryset

        # apply filters
        for field, value in filters.items():
            match field:
                # TODO: shelter filtering
                case "shelter":
                    pass
                case _:
                    field = f"{field}__iexact"
                    queryset = queryset.filter(**{field: value})

        # pagination and response
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)





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
