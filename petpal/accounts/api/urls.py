from django.urls import path
from . import views

app_name = "accounts"

urlpatterns = [
    path('register/<str:user_type>/create', views.RegistrationView.as_view(), name='register'),
    

    # path('seeker/create', views.RegistrationView.as_view(), name = "seeker_create"), 
    path('seeker/edit', views.UserUpdateView.as_view(), name='seeker_update'), 
    path('seeker/details', views.ProfileView.as_view(), name='profile'),

    path('shelter/create', views.RegistrationView.as_view(), name = "seeker_create"), 
]