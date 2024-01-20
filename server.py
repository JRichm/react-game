from flask import Flask, jsonify, request
from flask_sock import Sock
from flask_socketio import SocketIO
from flask_cors import CORS
import socketio

from model import World, connect_to_db, db

import os
from dotenv import load_dotenv

load_dotenv()


app = Flask(__name__)
CORS(app)
sock = Sock(app)

@sock.route('/worldSocket/<worldName>')
def worldSocket(ws, worldName):
    world = World.query.filter_by(name=worldName).first()
    if not world: 



    if world:
        ws.send(world.world_data)
    else:
        ws.send("World not found")

@app.route('/worlds')
def worlds():

    if request.method == 'GET':
        worlds = World.query.all()
        if worlds is None:
            return jsonify({"error": "No worlds found"}, 404)
        
    
    worlds_list = [
        {
            "id": world.id,
            "name": world.name,
            "owner": world.owner,
            "pin": world.pin,
            "created_at": world.created_at,
            "updated_at": world.updated_at,
            "last_played": world.last_played,
            "world_data": world.world_data
        }
        for world in worlds
    ]
    return jsonify(worlds_list)


def create_new_world_data():
    chunk = ["52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1",
             "52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1",
             "52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1",
             "52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1",
             "52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1",
             "52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1",
             "52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1",
             "52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1",
             "52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1",
             "52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1","52,171,83,1",
             ]

    world = []

    for x in range(3):
        for y in range(3):



if __name__ == '__main__':
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)