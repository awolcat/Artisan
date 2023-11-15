#!/usr/bin/python3
"""This module contains a class definition.
"""
from flask_app import db
from models.base import Base


class UserReview(Base, db.Model):
    """This class defines a user's reviews"""
    review = db.Column(db.String(250))
    rating = db.Column(db.Integer)
    booking_id = db.Column(db.Integer, db.ForeignKey('booking.id'), nullable=False)

    def __init__(self, **kwargs):
        """Initialises a userreview class
        """
        super().__init__(**kwargs)
