from flask import Flask, jsonify, request
from flask_cors import CORS

from model import World, connect_to_db, db

import os
from dotenv import load_dotenv

load_dotenv()



app = Flask(__name__)
CORS(app)


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

if __name__ == '__main__':
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)