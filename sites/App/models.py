from django.db import models

# Create your models here.
class professors(models.Model):
    name = models.CharField(max_length=500)
    Department = models.FileField(max_length=500)

