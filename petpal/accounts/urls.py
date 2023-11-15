from django.urls import path, include
from . import views
from accounts.views_folder import notifications

from rest_framework.routers import DefaultRouter

app_name = "accounts"
# router = DefaultRouter()
# router.register(r'shelter/(?P<shelter_id>[^/.]+)/reviews', views.ReviewViewSet, basename='pet-image')

urlpatterns = [
    path('notifications/new/', notifications.NotificationCreate.as_view(), name = "notif_create"),
    path('<str:user_type>/', views.RegistrationUpdateView.as_view(), name='register'),
    path('shelter/<int:pk>/details/', views.ShelterProfileView.as_view(), name='shelter-details'),
    path('shelter/all/', views.AllShelters.as_view(), name='shelter-all'),
    path('shelter/allApps/', views.SeekerProfileView.as_view(), name='shelter-allApps'),
    
    path('notifications/<int:pk>/', notifications.NotificationRetrieveUpdateDestroy.as_view(), name = "notif_retrieve_update_destroy"),
    path('notifications/list/', notifications.NotificationsList.as_view(), name = "notif_list"),
    # path('notifications/<int:pk>/trash/', notifications.NotificationDelete.as_view(), name = "notif_delete")
]
