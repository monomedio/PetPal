from django.urls import path, include
from . import views
from . import notifications

from rest_framework.routers import DefaultRouter

# from .views import ShelterViewSet


app_name = "accounts"

# router = DefaultRouter()
# router.register(r'profile', ShelterViewSet, basename='user-profile')

urlpatterns = [
    # path('seeker/', views.RegistrationView.as_view(), name='seeker_register'),

    # path('seeker', views.RegistrationView.as_view(), name = "seeker_create"), 
    # path('seeker/edit', views.UserUpdateView.as_view(), name='seeker_update'), 
    path('<str:user_type>/edit/', views.UpdateView.as_view(), name='update'),
    # path('seeker/details', views.ProfileView.as_view(), name='profile'),

    # path('shelter', views.RegistrationView.as_view(), name = "seeker_create"), 
    # path('shelter/details', views.ShelterProfileView.as_view(), name='shelter-details'),
    path('shelter/details/<int:pk>/', views.ShelterProfileView.as_view(), name='shelter-details'),
    # path('shelter/edit', views.ShelterUpdateView.as_view(), name='shelter-update'), 
    path('<str:user_type>/', views.RegistrationView.as_view(), name='register'),

    path('shelter/all/', views.AllShelters.as_view(), name='shelter-all'),
    # path('', include(router.urls)),
    
    path('notifications/<int:pk>/', notifications.NotificationUpdate.as_view(), name = "notif_update"),
    path('notifications', notifications.NotificationCreate.as_view(), name = "notif_create"),
    path('notifications/list', notifications.NotificationsList.as_view(), name = "notif_list"),
    path('notifications/<int:pk>/trash', notifications.NotificationDelete.as_view(), name = "notif_delete")
]
