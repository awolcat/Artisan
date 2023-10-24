#!/usr/bin/python3
"""
"""
from flask_app import db


class Contractor(db.Model):
    """This class defines a contractor
    """
    contractor_id = db.Column(db.String(60), primary_key=True)
    first_name = db.Column(db.String(60), nullable=False)
    last_name = db.Column(db.String(60), nullable=False)
    email = db.Column(db.String(60), nullable=False)
    Address = db.Column(db.String(128))
    phone_number = db.Column(Integer)
    skills = db.Column(db.String(128))
    
    def __str__(self):
        """String representation of the class
        """
        return "[{}]: {}".format(self.__class__.__name__, self.__dict__)
