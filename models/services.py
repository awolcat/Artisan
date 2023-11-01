#!/usr/bin/python3
"""
"""
from flask_app import db
from models.base import Base


class Service(Base, db.Model):
    """This class defines a service.
       There is a many-to-many relationship between contractors and services.
       The relationship and associative table are defined in contractors.py
    """
    name = db.Column(db.String(45), nullable=False)
    description = db.Column(db.Text)
    contracts = db.relationship('Contract', backref='service', lazy='dynamic')

    def __init__(self, **kwargs):
        """Initialises a service
        """
        super().__init__(**kwargs)
