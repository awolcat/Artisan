#!/usr/bin/python3
"""
"""
from flask_app import db
from models.base import Base


class Booking(Base, db.Model):
    """This class defines a user's booking
    """
    user_id = db.Column(db.String(60), db.ForeignKey('user.id'))
    contractor_id = db.Column(db.String(60), db.ForeignKey('contractor.id'))
    service_id = db.Column(db.String(60), db.ForeignKey('service.id'))
    user_reviews = db.relationship('UserReview', uselist=False,
                                   backref='bookings')

    def __init__(self, **kwargs):
        """Initialises a booking
        """
        super().__init__(**kwargs)


