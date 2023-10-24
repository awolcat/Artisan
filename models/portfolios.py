#!/usr/bin/python3
"""
"""
from flask_app import db


class portfolio(db.Model):
    """This class defines a contractors portfolio
    """
    portfolio_id = db.Column(db.String(60))
    description = db.Column(db.String(128))
    contractor_id = ""

    def __str__(self):
        """String representation of the class
        """
        return "[{}]: {}".format(self.__class__.__name__, self.__dict__)
