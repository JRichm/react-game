import datetime
from flask import jsonify
from model import connect_to_db, db, World
import json

def create_world(worldName): 

    print('creating new world with name', worldName)

    # check if worldName already exisits
    existing_world = World.query.filter(World.name == worldName).first()

    if existing_world:
        print('worldname already exists, returning...')
        return {
            "error": "worldName already exists"
        }

    # create new world object for database
    world = World(
        name=worldName,
        owner=None,
        pin=None,
        created=datetime.datetime.now(),
        updated=None,
        last_played=None,
        world_data=None
    )

    print('created new world object')


    # generate empty chunks
    chunks = [
        {"tileData": [
            "200,200,200,1"] * 100  # 100 blocks (10x10)
        } for _ in range(100)       # 100 chunks (10x10)
    ]

    # create world_data json and set world data to empty chunks
    new_world_data = {
        "worldID": world.id,
        "worldName": worldName,
        "worldOwner": "notset",
        "worldCreated": str(datetime.datetime.now()),
        "chunks": chunks
    }

    # set world_data
    world.world_data = new_world_data

    print('world chunks')    
    print(world.world_data)

    # add world to database
    db.session.add(world)
    db.session.commit()
    
    # serialize world object before returning
    serialized_world = serialize_world(world)
    
    # return serialized world object
    return jsonify(serialized_world)

def get_world_by_name(world_name):
    world = World.query.filter_by(name=world_name).first()
    if world:
        print('world found')
        return serialize_world(world)
    
    else:
        print('world not found')
        return {
            "error": "world not found",
            "code": 404
        }
    

def get_all_worlds():
    worlds = World.query
    print('worlds')
    print(worlds)
    if worlds:
        print('worlds found')
        return worlds
    
    else:
        print('worlds not found')
        return {
            "error": "worlds not found",
            "code": 404
        }

def serialize_world(world):
    print('serializing wolrd')
    print(world)
    return {
        "id": world.id,
        "name": world.name,
        "owner": world.owner,
        "pin": world.pin,
        "created": world.created,
        "updated": world.updated,
        "last_played": world.last_played,
        "world_data": world.world_data
    }

def dbConnectionHandler(app):
    connect_to_db(app)