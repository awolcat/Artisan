#!/usr/bin/python3
"""This module constains a function that needed for flask shell.
This modul is also the entry point for the flask app.
"""
from flask_app import *
from models.base import Base
from models.users import User
from models.bookings import Booking
from models.contractors import Contractor
from models.portfolios import Portfolio
from models.services import Service
from models.user_reviews import UserReview
from models.contracts import Contract
from models.service_offers import ServiceOffer



@app.shell_context_processor
def make_shell_context():
    """This function pre-imports all the needed modules in flask shell
    """
    return {'db': db,
            'ma': ma,
            'Base': Base,
            'User': User,
            'Booking': Booking,
            'Contractor': Contractor,
            'Portfolio': Portfolio,
            'Service': Service,
            'UserReview': UserReview,
            'Contract': Contract,
            'ServiceOffer': ServiceOffer,
            'populate_db': populate_db,
            'disassociate_services': disassociate_services,
            'disassociate_contractors': disassociate_contractors,
            }
