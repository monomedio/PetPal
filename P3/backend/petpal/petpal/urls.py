"""
URL configuration for petpal project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from pets import views
from blog.views import BlogPostViewSet
from blog.views import ReplyCreateViewSet
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'pets', views.PetViewSet)
router.register(r'applications', views.ApplicationViewSet, basename='application')
router.register(r'pets/(?P<pet_id>[^/.]+)/images', views.PetImageViewSet, basename='pet-image')
router.register(r'applications/(?P<application_id>[^/.]+)/comments', views.CommentViewSet, basename='comments')
router.register(r'shelter/(?P<shelter_id>[^/.]+)/reviews', views.CommentViewSet, basename='reviews')
router.register(r'shelter/(?P<shelter_id>[^/.]+)/reviews/(?P<review_id>[^/.]+)/replies', views.ReplyViewSet, basename='review-replies')
router.register(r'blog', BlogPostViewSet)
router.register(r'blog/(?P<postId>\d+)/replies', ReplyCreateViewSet, basename='blog-replies')

urlpatterns = [
    path('', include(router.urls)), # automatic URL routing
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('accounts/', include('accounts.urls')),
]+ \
    static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)