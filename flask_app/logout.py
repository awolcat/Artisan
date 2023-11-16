#!/usr/bin/python3
"""This module contains a function that logs out a user/contractor.
"""
from flask_app import app, jwt
from flask import jsonify
from flask_jwt_extended import unset_jwt_cookies


@app.route("/logout", methods=['POST'])
def logout():
    """This route logs out a user or a contractor.
    """
    response = jsonify({"message": "logout successful"})
    unset_jwt_cookies(response)
    return response
