#!/usr/bin/python3
"""
"""
from flask_app import db
from models.base import Base


class Service(Base, db.Model):
    """This class defines a user's reviews
    """
    name = db.Column(db.String(45), nullable=False)
    category = db.Column(db.String(45))
    price = db.Column(db.Integer)
    bookings = db.relationship(
        'Booking', backref='service', lazy='dynamic', cascade='delete, delete-orphan')

    def __init__(self, **kwargs):
        """Initialises a service
        """
        super().__init__(**kwargs)
