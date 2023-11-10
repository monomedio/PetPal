from rest_framework import status
from rest_framework.response import Response
# from ..models import User
# from django.contrib.auth.hashers import make_password

# from rest_framework.decorators import api_view

# from accounts.api.serializers import seekerCreateSerializer

# from rest_framework.generics import CreateAPIView

# @api_view(['POST',])
# def registration_view(request): 
#     if request.method == 'POST': 
#         serializer = seekerCreateSerializer(data=request.data)
#         data = {}
#         if serializer.is_valid(): 
#             account = serializer.save()
#             data['response'] = "Success"
#             data['email'] = account.email
#             data['first_name'] = account.first_name
#             data['last_name'] = account.last_name
#             data['phone'] = account.phone
#             data['is_shelter'] = account.is_shelter
#         else: 
#             data = serializer.errors
#         return Response(data)


from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from .serializers import seekerCreateSerializer

class RegistrationView(CreateAPIView):
    serializer_class = seekerCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            account = serializer.save()
            data = {
                "response": "Success",
                "username": account.username,
                "email": account.email,
                "first_name": account.first_name,
                "last_name": account.last_name,
                "phone": account.phone,
                "is_shelter": account.is_shelter
            }
            return Response(data)
        else:
            return Response(serializer.errors)