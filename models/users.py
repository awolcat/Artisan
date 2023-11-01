
#!/usr/bin/python3
"""This module defines a User class
"""
from flask_app import db
from models.base import Base


class User(Base, db.Model):
    """This class defines a user"""
    first_name = db.Column(db.String(60), nullable=False)
    last_name = db.Column(db.String(60), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    phone_number = db.Column(db.String(60), unique=True)
    address = db.Column(db.String(128))

    contracts = db.relationship('Contract', backref='user', lazy='dynamic', cascade='all, delete-orphan')
    bookings = db.relationship('Booking', backref='user', lazy='dynamic')
    

    def __init__(self, **kwargs):
        """Initialises a user
        """
        super().__init__(**kwargs)
