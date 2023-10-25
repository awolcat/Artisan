#!/usr/bin/python3
"""
"""
from flask_app import db, ma
from models.base import Base


class Service(Base, db.Model):
    """This class defines a user's reviews
    """
    name = db.Column(db.String(45), nullable=False)
    category = db.Column(db.String(45), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    contractor_id = db.Column(db.String(60), db.ForeignKey('contractor.id'))
    bookings = db.relationship('Booking', uselist=False,
							   backref='services', lazy='dynamic')

    def __init__(self, **kwargs):
        """Initialises a service
        """
        super().__init__(**kwargs)

class ServiceSchema(ma.SQLAlchemyAutoSchema):
	"""Generate Service model schema
	"""
	class Meta:
		model = Service
		include_fk = True
