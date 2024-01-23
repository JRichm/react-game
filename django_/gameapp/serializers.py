from rest_framework import serializers
from gameapp.models import Worlds, Users

class WorldSerializer(serializers.ModelSerializer):
    class Meta:
        model=Worlds
        fields=('world_id', 'world_name', 'owner', 'pin', 'created', 'updated', 'last_played')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=Users
        fields=('user_id', 'user_name', 'user_email', 'user_pass_hash')