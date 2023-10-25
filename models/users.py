#!/usr/bin/python3
"""This module defines a User class
"""
from flask_app import db, ma
from models.base import Base


class User(Base, db.Model):
    """This class defines a user
    """
    first_name = db.Column(db.String(45), index=True)
    last_name = db.Column(db.String(45), index=True)
    email = db.Column(db.String(45), index=True, unique=True)
    phone_number = db.Column(db.Integer, unique=True)
    address = db.Column(db.String(128))
    bookings = db.relationship('Booking', backref='users', lazy='dynamic')

    def __init__(self, **kwargs):
        """Initialises a user
        """
        super().__init__(**kwargs)


class UserSchema(ma.SQLAlchemyAutoSchema):
	"""Generate User model schema
	"""
	class Meta:
		model = User
		include_fk = True
