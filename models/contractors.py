#!/usr/bin/python3
"""
"""
from flask_app import db
from models.base import Base


"""table setup for many to many relationship between service and contractor models"""
contractor_service = db.Table('contractor_service',
                              db.Column('service_id', db.Integer, db.ForeignKey(
                                  'service.id'), primary_key=True),
                              db.Column('contractor_id', db.Integer, db.ForeignKey(
                                  'contractor.id'), primary_key=True)
                              )

class Contractor(Base, db.Model):
    """This class defines a contractor"""
    first_name = db.Column(db.String(60), nullable=False)
    last_name = db.Column(db.String(60), nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    address = db.Column(db.String(128))
    phone_number = db.Column(db.String(60))
    skills = db.Column(db.String(128))
    occupation = db.Column(db.String(45))

    bookings = db.relationship('Booking', backref='contractor', lazy='dynamic', cascade='all, delete-orphan')
    portfolio = db.relationship('Portfolio', backref='contractor', uselist=True, cascade='all, delete-orphan')
    services = db.relationship('Service', secondary=contractor_service, lazy='dynamic', backref='contractors')
    service_offers = db.relationship('ServiceOffer', backref='contractor', lazy='dynamic', cascade='all, delete-orphan')


    def __init__(self, **kwargs):
        """Initialises a contractor
        """
        super().__init__(**kwargs)
