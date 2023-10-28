#!/usr/bin/python3
"""
"""
from flask_app import db
from models.base import Base


class Booking(Base, db.Model):
    """This class defines a user's booking
    """
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey(
        'service.id'))
    contractor_id = db.Column(db.Integer, db.ForeignKey(
        'contractor.id'), nullable=False)
    user_reviews = db.relationship('UserReview', uselist=False,
                                   backref='booking', cascade='all, delete')

    def __init__(self, **kwargs):
        """Initialises a booking
        """
        super().__init__(**kwargs)
