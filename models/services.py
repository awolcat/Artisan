#!/usr/bin/python3
"""
"""
from flask_app import db


class Service(db.Model):
    """This class defines a user's reviews
    """
    service__id = db.Column(db.String(60), primary_key=True)
    name = db.Column(db.String(45), nullable=False)
    category = db.Column(db.String(45), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    contractor_id = ""

    def __str__(self):
        """String representation of the class
        """
        return "[{}]: {}".format(self.__class__.__name__, self.__dict__)
