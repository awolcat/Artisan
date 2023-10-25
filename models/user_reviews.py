#!/usr/bin/python3
"""
"""
from flask_app import db, ma
from models.base import Base


class UserReview(Base, db.Model):
    """This class defines a user's reviews
    """
    review = db.Column(db.String(128))
    rating = db.Column(db.Enum('1', '2', '3', '4', '5'))
    booking_id = db.Column(db.String(60), db.ForeignKey('booking.id'))

    def __init__(self, **kwargs):
        """Initialises a userreview class
        """
        super().__init__(**kwargs)


class UserReviewSchema(ma.SQLAlchemyAutoSchema):
	"""Generate UserReview model schema
	"""
	class Meta:
		model = UserReview
		include_fk = True
