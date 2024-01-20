import datetime
from flask import jsonify
from model import World, db

def create_new_world(worldName): 

    # check if worldName already exisits
    existing_world = World.query.filter(World.name == worldName).first()

    if existing_world:
        return False

    world = World(
        name=worldName,
        owner=None,
        pin=None,
        created=datetime.datetime.now(),  # Fix the datetime import
        updated=None,
        last_played=None,
        world_data=None,  # Make sure World model has this attribute
    )

    chunks = [
        {"tileData": [
            "229,231,235,1"] * 100  # Simplified for clarity
        } for _ in range(100)
    ]

    new_world_data = {
        "worldID": world.id,
        "worldName": worldName,
        "worldCreated": datetime.datetime.now(),
        "chunks": chunks
    }

    world.world_data = jsonify(new_world_data)
    db.add(world)
    db.commit()
    return True