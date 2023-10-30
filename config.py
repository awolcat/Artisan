# /usr/bin/python3
"""Configures variables for SQLAlchemy
"""
import os


class Config(object):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'mysql://root:''@localhost/app.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False    
