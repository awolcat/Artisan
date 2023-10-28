#!/usr/bin/python3
"""Create a blueprint for API
"""
from flask import Blueprint
from flask_restx import Api

app_views = Blueprint('app_views', __name__, url_prefix='/api')
api = Api(app_views, doc='/doc', version='1.0', title="Artisan RESTful API")

from flask_app.api.v1.views.contractors import *
