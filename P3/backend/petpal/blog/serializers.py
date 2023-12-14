from rest_framework import serializers
from .models import BlogPost, Reply


class BlogPostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'content', 'image', 'author', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class ReplySerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    blog_post = BlogPostSerializer(read_only=True)

    class Meta:
        model = Reply
        fields = ['id', 'blog_post', 'content', 'author', 'created_at', 'updated_at']