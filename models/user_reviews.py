#!/usr/bin/python3
"""
"""
from flask_app import db


class UserReview(db.Model):
    """This class defines a user's reviews
    """
    user_review_id = db.Column(db.String(60), primary_key=True)
    review = db.Column(db.String(128))
    rating = db.Column(db.Enum('1', '2', '3', '4', '5'))

    def __str__(self):
        """String representation of the class
        """
        return "[{}]: {}".format(self.__class__.__name__, self.__dict__)
