from rest_framework import serializers
from .models import BlogPost


class BlogPostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.first_name')
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'content', 'image', 'author', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']