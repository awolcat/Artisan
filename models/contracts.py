#!/usr/bin/python3
"""
"""
from models.base import Base
from flask_app import db


class Contract(Base, db.Model):
    """Creates a contract, only a user can"""
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'), nullable=False)
    description = db.Column(db.Text)
    budget = db.Column(db.Float)
    start_date = db.Column(db.String(60))
    end_date = db.Column(db.String(60))
    status = db.Column(db.String(50))

    bookings = db.relationship('Booking', backref='contract', lazy='dynamic', cascade='all, delete-orphan')

    def __init__(self, **kwargs):
        """Initialises a contract
        """
        super().__init__(**kwargs)
