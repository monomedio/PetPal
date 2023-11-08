from django.db import models

class Seeker(models.Model):
    # django default has 
    name = models.CharField(max_length=200)
    email = models.EmailField(default='admin@utoronto.ca')
    phone = models.CharField(max_length=200)
