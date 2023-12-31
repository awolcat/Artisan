
#!/usr/bin/python3
"""This module defines a User class
"""
from flask_app import db, bcrypt
from models.base import Base


class User(Base, db.Model):
    """This class defines a user"""
    first_name = db.Column(db.String(60), nullable=False)
    last_name = db.Column(db.String(60), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    hashed_password = db.Column(db.String(128), nullable=True)
    email = db.Column(db.String(60), unique=True, nullable=False)
    phone_number = db.Column(db.String(60), unique=True)
    address = db.Column(db.String(128))

    contracts = db.relationship('Contract', backref='user', lazy='dynamic', cascade='all, delete-orphan')
    bookings = db.relationship('Booking', backref='user', lazy='dynamic', cascade='all, delete-orphan')
    

    def __init__(self, **kwargs):
        """Initialises a user
        """
        super().__init__(**kwargs)
        self.hashed_password = bcrypt.generate_password_hash(kwargs.get('password')).decode('utf-8')

    def check_password(self, password):
        """Checks if enetered password is correct"""
        check = bcrypt.check_password_hash(self.hashed_password, password)
        return check
