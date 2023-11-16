# /usr/bin/python3
"""This module configures variables for SQLAlchemy
"""
import os
from datetime import timedelta


class Config(object):
    """This class configures the flask app variables needed for some 
       flask extensions.
    """
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'mysql://artisan_db_dev:artisan_db_pwd@localhost/artisan_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "ARTISAN_2023_SECRET_TOKEN"
    CORS_HEADERS = 'Content-Type'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
