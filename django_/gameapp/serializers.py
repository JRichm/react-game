from rest_framework import serializers
from gameapp.models import Worlds

class WorldSerializer(serializers.ModelSerializer):
    class Meta:
        model=Worlds
        fields=('world_id', 'world_name', 'owner', 'pin', 'created', 'updated', 'last_played')