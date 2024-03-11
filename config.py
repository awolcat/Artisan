#!/usr/bin env python3
"""Flask app configuration object
"""
from datetime import timedelta

class Config:

    SQLALCHEMY_DATABASE_URI = "mysql://irura:artisan_dev_pwd@irura.mysql.pythonanywhere-services.com/irura$artisan_db"
    SQLALCHEMY_POOL_RECYCLE = 280
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "ARTISAN_2023_SECRET_TOKEN"
    CORS_HEADERS = 'Content-Type'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
