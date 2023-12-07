from rest_framework import serializers
from .models import BlogPost


class BlogPostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = BlogPost
        fields = ['title', 'content', 'image', 'author', 'created_at', 'updated_at']
        read_only_fields = ['author', 'created_at', 'updated_at']