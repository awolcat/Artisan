#!/usr/bin/python3
"""This module defines a User class
"""
from flask_app import db


class User(db.Model):
    """This class defines a user
    """
    id = db.Column(db.String(60), primary_key=True)
    first_name = db.Column(db.String(45), index=True)
    last_name = db.Column(db.String(45), index=True)
    email = db.Column(db.String(45), index=True, unique=True)
    phone_number = db.Column(db.Integer, unique=True)
    address = db.Column(db.String(128))

    def __str__(self):
        """String representation of the class
        """
        return "[{}]: {}".format(self.__class__.__name__, self.__dict__)
