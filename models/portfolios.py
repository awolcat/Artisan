#!/usr/bin/python3
"""
"""
from flask_app import db
from models.base import Base


class Portfolio(Base, db.Model):
    """This class defines a contractors portfolio
    """
    description = db.Column(db.String(128), nullable=False)
    image_url = db.Column(db.String(128))
    contractor_id = db.Column(db.Integer, db.ForeignKey('contractor.id'), nullable=False)

    def __init__(self, **kwargs):
        """Initialises a user                                                                                        
        """
        super().__init__(**kwargs)
