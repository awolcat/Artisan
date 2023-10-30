#!/usr/bin/python3
"""
"""
from flask_app import db
from models.base import Base


class Service(Base, db.Model):
    """This class defines a service"""
    name = db.Column(db.String(45), nullable=False)
    description = db.Column(db.Text)

    def __init__(self, **kwargs):
        """Initialises a service
        """
        super().__init__(**kwargs)
