from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path
from .views import LogoutView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
]