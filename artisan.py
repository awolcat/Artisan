#!/usr/bin/python3
"""
"""
from flask_app import app, add_all, populate_db, ma, db
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
            'add_all': add_all,
            'populate_db': populate_db,
            'mark_bookings_as_inactive': mark_bookings_as_inactive,
            'disassociate_services': disassociate_services,
            'disassociate_contractors': disassociate_contractors,
            'before_flush': before_flush,
            }
