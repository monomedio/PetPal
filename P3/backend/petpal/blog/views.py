from django.shortcuts import render
from requests import Response

from .models import BlogPost, Reply
from .serializers import BlogPostSerializer, ReplySerializer
from .pagination import LargeResultsSetPagination

from rest_framework import viewsets, permissions
from rest_framework.views import APIView
# Create your views here.


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user


class BlogPostViewSet(viewsets.ModelViewSet):

    # queryset = BlogPost.objects.all()
    # .order_by('-created_at')
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    pagination_class = LargeResultsSetPagination

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    
    def get_queryset(self):
        queryset = BlogPost.objects.all()
        query = self.request.query_params.get('q', None)
        if query is not None:
            queryset = queryset.filter(title__icontains=query)
        return queryset

class ReplyCreateViewSet(viewsets.ModelViewSet):
    serializer_class = ReplySerializer
    queryset = Reply.objects.order_by('-created_at')

    def get_queryset(self):

        queryset = Reply.objects.order_by('-created_at')
        post_id = self.kwargs.get('postId')

        if post_id is not None:
            queryset = queryset.filter(blog_post=post_id)

        return queryset

    def perform_create(self, serializer):
        blog_post = BlogPost.objects.get(id=self.kwargs['postId'])
        if self.request.user.is_authenticated:
            serializer.save(author=self.request.user, blog_post=blog_post)
        else:
            serializer.save(author=None, blog_post=blog_post)
