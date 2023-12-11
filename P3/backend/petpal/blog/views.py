from django.shortcuts import render

from .models import BlogPost
from .serializers import BlogPostSerializer

from rest_framework import viewsets, permissions

# Create your views here.

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    # permission_classes = [permissions.IsAuthenticated]

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)