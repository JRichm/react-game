from django.db import models

# Create your models here.
class Worlds(models.Model):
    WorldId = models.AutoField(primary_key=True)
    WorldName = models.CharField(max_length=8)
    WorldPin = models.CharField(max_length=4)