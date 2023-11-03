#!/usr/bin/python3
"""This module contains a function that sets up user authentication
"""
from flask_app import app
from flask import jsonify, abort, request
from models.users import User
from flask_jwt_extended import create_access_token
from flask_jwt_extended import unset_jwt_cookies
from flask_jwt_extended import set_access_cookies


@app.route('/auth/login', methods=['POST'])
def login():
    """Authenticates users for login"""
    data = request.get_json()
    if not data:
        abort(400, description="Not a JSON")
    required = ['email', 'password']
    for field in required:
        if field not in data:
            abort(400, description=f"Missing {field}")
    users = User.query.all()
    for user in users:
        if data['email'] == user.email and data['password'] == user.password:
            break
        elif data['email'] == user.email and data['password'] != user.password:
            return jsonify({"message": "incorrect Password"})
        elif data['email'] != user.email and data['password'] == user.password:
            return jsonify({"message": "incorrect email"})
    else:
        return jsonify({"message": "account does not exist"})

    response = jsonify({"message": "login successful"})
    token = create_access_token(identity=data['email'])
    set_access_cookies(response, token)
    return response


@app.route("/auth/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response
