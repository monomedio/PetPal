from django.db import models

from accounts.models import User

# class PostBase(models.Model):
#     content = models.TextField()
#     author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="author", null=True))
    
#     class Meta:
#         abstract = True

# class Topic(Post):
#     title = models.CharField(max_length=255)
#     last_active = models.DateTimeField(auto_now=True)
    
#     def __str__(self):
#         return self.title

# Create your models here.
class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="author", null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='blog_images/', blank=True, null=True)

    def __str__(self):
        return self.title
    
class Reply(models.Model):
    blog_post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='replies')
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reply_author", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"Reply to {self.blog_post.title} by {self.author.username}"