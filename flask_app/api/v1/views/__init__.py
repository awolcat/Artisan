#!/usr/bin/python3
"""Create a blueprint for API
"""
from flask import Blueprint
from flask_cors import CORS

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from flask_app.api.v1.views.contractors import *
from flask_app.api.v1.views.service_offers import *
from flask_app.api.v1.views.users import *
from flask_app.api.v1.views.contracts import *
from flask_app.api.v1.views.portfolios import *
from flask_app.api.v1.views.user_reviews import *
from flask_app.api.v1.views.services import *
from flask_app.api.v1.views.bookings import *

