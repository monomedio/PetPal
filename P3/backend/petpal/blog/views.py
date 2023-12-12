from django.shortcuts import render

from .models import BlogPost
from .serializers import BlogPostSerializer
from .pagination import LargeResultsSetPagination

from rest_framework import viewsets, permissions

# Create your views here.

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    # .order_by('-created_at')
    serializer_class = BlogPostSerializer
    # permission_classes = [permissions.IsAuthenticated]
    pagination_class = LargeResultsSetPagination

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)