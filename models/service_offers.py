#!/usr/bin/python3
"""
"""
from flask_app import db
from models.base import Base


class ServiceOffer(Base, db.Model):
    """This class defines an offer by a contractor"""
    name = db.Column(db.String(255), nullable=False)
    contractor_id = db.Column(db.Integer, db.ForeignKey('contractor.id'), nullable=False)
    description = db.Column(db.Text)
    price = db.Numeric(precision=10, scale=2)
    status = db.Column(db.String(50))
#    bookings = db.relationship('Booking', backref='service_offer', lazy='dynamic', cascade='all, delete-orphan')
    
    def __init__(self, **kwargs):
        """Initialises a service
        """
        super().__init__(**kwargs)
