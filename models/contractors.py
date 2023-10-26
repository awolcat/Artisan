#!/usr/bin/python3
"""
"""
from flask_app import db
from models.base import Base


class Contractor(Base, db.Model):
    """This class defines a contractor
    """
    first_name = db.Column(db.String(60), nullable=False)
    last_name = db.Column(db.String(60), nullable=False)
    email = db.Column(db.String(60), nullable=False)
    Address = db.Column(db.String(128))
    phone_number = db.Column(db.Integer)
    skills = db.Column(db.String(128))
    occupation = db.Column(db.String(45))
    bookings = db.relationship(
        'Booking', backref='contractors', lazy='dynamic')
    services = db.relationship(
        'Service', backref='contractors', lazy='dynamic')
    portfolios = db.relationship(
        'Portfolio', backref='contractors', uselist=True, lazy='dynamic')

    def __init__(self, **kwargs):
        """Initialises a contractor
        """
        super().__init__(**kwargs)
