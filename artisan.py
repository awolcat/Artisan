#!/usr/bin/python3
"""
"""
from flask_app import app
from flask_app import db, ma
from models.base import Base
from models.users import User
from models.bookings import Booking
from models.contractors import Contractor
from models.portfolios import Portfolio
from models.services import Service
from models.user_reviews import UserReview
from models.schemas import *


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
            'UserReview': UserReview
    }
