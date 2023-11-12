from django.urls import path
from . import views
from . import notifications

app_name = "accounts"

urlpatterns = [
    path('create', views.RegistrationView.as_view(), name = "seeker_create"),
    path('notifications/<int:pk>/', notifications.NotificationUpdate.as_view(), name = "notif_update"),
    path('notifications', notifications.NotificationCreate.as_view(), name = "notif_create"),
    path('notifications/list', notifications.NotificationsList.as_view(), name = "notif_list"),
    path('notifications/<int:pk>/trash', notifications.NotificationDelete.as_view(), name = "notif_delete")
]