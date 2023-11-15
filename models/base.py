#!/usr/bin/python3
""" This module contains a base clasee definition
"""
import uuid
from flask_app import db
from datetime import datetime


class Base:
    """Superclass from which other model classes subclass.
    """

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, **kwargs):
        """Initialises a class
        """
        if kwargs:
            for key, value in kwargs.items():
                if key != "__class__":
                    setattr(self, key, value)

            if key == "created_at" and isinstance(value, str):
                self.created_at = datetime.strptime(value, "%Y-%m-%d %H:%M:%S")
            elif key == "updated_at" and isinstance(value, str):
                self.updated_at = datetime.strptime(value, "%Y-%m-%d %H:%M:%S")

    def __str__(self):
        """String representation of the class
        """
        return "[{}]: {}".format(self.__class__.__name__, self.__dict__)

    def __repr__(self):
        """Obj representation of the class
        """
        return "[{}]: {}".format(self.__class__.__name__, self.__dict__)

    def new(self):
        """Adds a new entry to the database
        """
        db.session.add(self)

    def save(self):
        """Saves to the db session
        """
        self.updated_at = datetime.utcnow()
        db.session.commit()

    def delete(self):
        """Deletes from the current db session
        """
        db.session.delete(self)
