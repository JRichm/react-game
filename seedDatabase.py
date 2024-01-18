import os
import json
from server import app
from model import connect_to_db, db


# delete db to start fresh
os.system("dropdb -U jamcam nextgame")
os.system("createdb -U jamcam nextgame")

# use app context
with app.app_context():
    connect_to_db(app)
    db.create_all()
    db.session.commit()

    print('created database')