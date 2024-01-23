from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from gameapp.models import Worlds
from gameapp.serializers import WorldSerializer



# Create your views here.
def home(request): 
    return HttpResponse("Hello world!")

@csrf_exempt
def gameApi(request, id=0):
    if request.method == 'GET':
        worlds = Worlds.objects.all()
        worlds_serializer = WorldSerializer(worlds, many=True)
        return JsonResponse(worlds_serializer.data, safe=False)
    elif request.method == 'POST':
        worlds_data=JSONParser().parse(request)
        worlds_serializer = WorldSerializer(data=worlds_data)
        print(worlds_serializer)
        if worlds_serializer.is_valid():
            worlds_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        print(worlds_serializer.errors)
        return JsonResponse("Faled to Add", safe=False)
    elif request.method=='PUT':
        world_data = JSONParser().parse(request)
        world = Worlds.objects.get(world_id=world_data['world_id'])
        worlds_serializer = WorldSerializer(world, data=world_data)
        if worlds_serializer.is_valid():
            worlds_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        world = Worlds.objects.get(world_id=id)
        world.delete()
        return JsonResponse("Deleted Successfully", safe=False)

        


