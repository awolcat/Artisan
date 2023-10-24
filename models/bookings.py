#!/usr/bin/python3
"""
"""
from flask_app import db
from datetime import datetime


class Booking(db.Model):
    """This class defines a user's booking
    """
    booking_id = db.Column(db.String(60), primary_key=True)
    created_at = db.Column(DateTime, default=datetime.utcnow(), nullable=True)
    updated_at = db.Column(DateTime, default=datetime.utcnow(), nullable=True)
    user_id = ""
    contractor_id = ""
    service_id = ""

    def __str__(self):
        """String representation of the class
        """
        return "[{}]: {}".format(self.__class__.__name__, self.__dict__)

