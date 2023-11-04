#!/usr/bin/python3
"""This module contains a function that sets up user authentication
"""
from flask_app import app, jwt
from flask import jsonify
from flask_jwt_extended import unset_jwt_cookies


@app.route("/logout", methods=['POST'])
def logout():
    response = jsonify({"message": "logout successful"})
    unset_jwt_cookies(response)
    return response
