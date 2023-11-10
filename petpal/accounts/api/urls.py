from django.urls import path
from . import views

app_name = "accounts"

urlpatterns = [
    path('create', views.RegistrationView.as_view(), name = "seeker_create")
]