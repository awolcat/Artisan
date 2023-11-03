# /usr/bin/python3
"""Configures variables for SQLAlchemy
"""
import os
from datetime import timedelta


class Config(object):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'mysql://root:artisan_db_pwd@localhost/artisan_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "ARTISAN_2023_SECRET_TOKEN"
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
