#!/usr/bin/python3
"""
"""
from flask_app import app


@app.route('/')
@app.route('/index')
def index():
    return "Hello Artisans!"
