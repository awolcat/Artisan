#!/usr/bin/python3
"""
"""
from flask_app import db
from datetime import datetime
from models.base import Base


class Booking(Base, db.Model):
    """This class defines a booking"""
    booking_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(60))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    contract_id = db.Column(db.Integer, db.ForeignKey('contract.id'), nullable=True)
    active_user = db.Column(db.Boolean, default=True)
    contractor_id = db.Column(db.Integer, db.ForeignKey('contractor.id'), nullable=False)
    service_offer_id = db.Column(db.Integer, db.ForeignKey('service_offer.id'), nullable=True)
    active_contractor = db.Column(db.Boolean, default=True)
    user_reviews = db.relationship('UserReview', backref='booking', cascade='all, delete')
     
    def __init__(self, **kwargs):
        """Initialises a booking
        """
        super().__init__(**kwargs)

    def mark_as_inactive_user(self):
        """
        """
        self.active_user = False
        db.session.commit()

    def mark_as_inactive_contractor(self):
        """
        """
        self.active_contractor = False
        db.session.commit()
