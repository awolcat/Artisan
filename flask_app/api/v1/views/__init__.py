#!/usr/bin/python3
"""Create a blueprint for API
"""
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from flask_app.api.v1.views.contractors import *
