from django.db import models


class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=20, null=True)
    user_email = models.EmailField(null=True)
    user_passwordHash = models.CharField(max_length=64, null=True)

# Create your models here.
class Worlds(models.Model):
    world_id = models.AutoField(primary_key=True)
    world_name = models.CharField(max_length=20, null=True)
    owner = models.ForeignKey(Users, on_delete=models.CASCADE, null=True)
    pin = models.CharField(max_length=4, null=True)
    created = models.DateField(null=True)
    updated = models.DateField(null=True)
    last_played = models.DateField(null=True)