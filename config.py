# /usr/bin/python3
"""Configures variables for SQLAlchemy
"""
import os


class Config(object):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'mysql://root:artisan_db_pwd@localhost/artisan_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
