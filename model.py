from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey

import os
db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "Users"

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    username = db.Column(db.String(), unique=True, nullable=False)
    email = db.Column(db.String(), unique=True, nullable=False)
    password_hash = db.Column(db.String(), nullable=False)
    created = db.Column(db.Date(), nullable=False)
    updated = db.Column(db.Date(), nullable=False)


class World(db.Model):
    __tablename__ = "Worlds"

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    name = db.Column(db.String(), nullable=False, unique=True)
    owner = db.Column(db.Integer(), ForeignKey("Users.id", ondelete="CASCADE"), nullable=False, unique=True)
    pin = db.Column(db.String(), nullable=False, unique=True)
    created = db.Column(db.Date(), nullable=False)
    updated = db.Column(db.Date(), nullable=False)
    last_played = db.Column(db.Date(), nullable=False)
    world_data = db.Column(db.JSON(), nullable=False)


def connect_to_db(app):
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI")
    db.app = app
    db.init_app(app)

    print('connected to the db!')