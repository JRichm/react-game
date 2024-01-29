from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from secrets import token_hex


from gameapp.models import Worlds, Users
from gameapp.serializers import WorldSerializer, UserSerializer

# Create your views here.
def home(request): 
    return HttpResponse("Hello world!")


@csrf_exempt    
def world(request, world_name=None):
#       #       #       #       #       #       #       #       #       #       #
#   GET world data
#
    if request.method == 'GET':
        try:
            # if world_name is used
            if world_name is not None:
                world = Worlds.objects.get(world_name=world_name)
                serialized_world = WorldSerializer(world)

            # otherwise return all worlds
            else:
                worlds = Worlds.objects.all()
                serialized_world = WorldSerializer(worlds, many=True)

            # return serialized data
            return JsonResponse(serialized_world.data, safe=False)
        
        # if world is not found
        except ObjectDoesNotExist:

            # return 404
            return JsonResponse({"error": "World not found"}, status=404)
        

#       #       #       #       #       #       #       #       #       #       #
#   CREATE world data
#
    elif request.method == 'POST':

        # TODO update function to handle case if world name appears in request body

        # check if new world_name has been input
        if world_name is not None:

            # check if input name is already in use
            world_query = Worlds.objects.filter(world_name=world_name)
            if world_query.exists():
                return JsonResponse({"error": "World name already in use"}, status=409)
            
            else:
                new_name = world_name

        # otherwise generate new name string
        else:
            new_name = token_hex(3)
            
            # check if newly generated name matches a name in the database
            while Worlds.objects.filter(world_name=new_name).exists():
                new_name = token_hex(3)


        # save new world in database
        new_world = Worlds(world_name=new_name)
        new_world.save()

        return JsonResponse({"message": "World created successfully!", "world_name": new_name}, status=201)
        

#       #       #       #       #       #       #       #       #       #    
#   UPDATE world data
#
    elif request.method == 'PUT':

        # get data from request body
        world_data = JSONParser().parse(request)

        # try to get world from world name
        if world_name is not None:
            world = Worlds.objects.get(world_name=world_name)

            # if world name from endpoint don't match world id from params
            if world.world_name != world_name:
                return JsonResponse({"error": "world_name does not match world_id"}, status=404)
        
        # use world id from world_data
        elif 'world_id' in world_data:
            world = Worlds.objects.get(world_id=world_data['world_id'])

        # return if world is not found
        else:
            return JsonResponse({"error": "World not found."}, status=404)

        # serialize and save world with new data
        worlds_serializer = WorldSerializer(world, data=world_data)
        if worlds_serializer.is_valid():
            worlds_serializer.save()
            return JsonResponse("Update Successfully!", safe=False, status=200)
        
        # return if serialization is not valid
        return JsonResponse({"error": "Failed to Update."}, status=406)
        

#       #       #       #       #       #       #       #       #       #     
#   DELETE world data
#
    elif request.method == 'DELETE':

        world_data = JSONParser().parse(request)

        # try to get world from world name
        if world_name is not None:
            world = Worlds.objects.get(world_name=world_name)

        elif 'world_name' in world_data:
            world = Worlds.objects.get(world_name=world_data['world_name'])

        elif 'world_id' in world_data:
            world = Worlds.objects.get(world_name=world_data['world_id'])

        else: 
            return JsonResponse({"error": "World not found."}, status=404)
        
        world.delete()
        return JsonResponse("World deleted successfully!", safe=False, status=200)
        
    #       #       #       #       #       #       #       #       #       #     


@csrf_exempt    
def check_pin(request):
#       #       #       #       #       #       #       #       #       #       #
#   check world pin for access
#
    if request.method == 'GET':
        try:
            # get world_name and input_pin from query parameters
            world_name = request.GET.get('world_name')
            input_pin = request.GET.get('input_pin')

            print(world_name)
            print(input_pin)

            # check if the world exists
            world = Worlds.objects.get(world_name=world_name)

            if world.pin == input_pin:
                print(world.pin, " is equal to ", input_pin)
                is_pin_valid = True
            else:
                print(world.pin, " is not equal to ", input_pin)
                is_pin_valid = False

            return JsonResponse({"pinValid": is_pin_valid})
        except Worlds.DoesNotExist:
            return JsonResponse({"error": "World not found"}, status=404)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=400)


@csrf_exempt
def worldApi(request, id=0):

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
    
@csrf_exempt
def userApi(request, id=0):

    if request.method == 'GET':
        users = Users.objects.all()
        users_serializer = UserSerializer(users, many=True)
        return JsonResponse(users_serializer.data, safe=False)
    
    elif request.method == 'POST':
        users_data=JSONParser().parse(request)
        users_serializer = UserSerializer(data=users_data)
        print(users_serializer)
        if users_serializer.is_valid():
            users_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        print(users_serializer.errors)
        return JsonResponse("Faled to Add", safe=False)
    
    elif request.method=='PUT':
        user_data = JSONParser().parse(request)
        user = Users.objects.get(user_id=user_data['user_id'])
        users_serializer = UserSerializer(user, data=user_data)
        if users_serializer.is_valid():
            users_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update")
    
    elif request.method == 'DELETE':
        user = Users.objects.get(user_id=id)
        user.delete()
        return JsonResponse("Deleted Successfully", safe=False)

        


