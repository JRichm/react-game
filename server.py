from flask import Flask, jsonify, request, redirect
from flask_sock import Sock
from flask_socketio import SocketIO
from flask_cors import CORS
import socketio

from controller import create_world, get_world_by_name, dbConnectionHandler, get_all_worlds

import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
sock = Sock(app)

@sock.route('/worldSocket/<worldName>')
def worldSocket(ws, worldName):
    world = get_world_by_name(worldName)
    if world:
        print(world)
        ws.send(world.world_data)
    else:
        print('world not found')
        return redirect("/play/worldnotfound", code=204)
        

@app.route('/get_world/<worldName>', methods=['GET'])
def get_world(worldName):
    world = get_world_by_name(worldName)
    if (world):
        return world
    else:
        return {
            "error": "world not found",
            "code": "404"
        }


@app.route('/create_world/<worldName>', methods=['GET'])
def create_new_world(worldName):
    new_world = create_world(worldName)

    return new_world













@app.route('/worlds')
def worlds():

    if request.method == 'GET':
        print('worlds getting')
        worlds = get_all_worlds()
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

    return worlds_list

if __name__ == '__main__':
    dbConnectionHandler(app)
    app.run(host="0.0.0.0", debug=True)