#!/usr/bin/python3
"""This module contains a function that sets up contractor authentication
"""
from flask_cors import cross_origin
from flask_app import app, jwt
from flask import jsonify, abort, request
from models.users import User
from models.contractors import Contractor
from models.schemas import UserSchema, ContractorSchema
from flask_jwt_extended import jwt_required, set_access_cookies
from flask_jwt_extended import create_access_token, get_jwt_identity


@jwt.user_identity_loader
def identity_lookup(user):
    """
     Register a callback function that takes whatever object is passed in as the
     identity when creating JWTs and converts it to a JSON serializable format.
     This function is necessary for the one below logins to work. The user parameter
     is from flask_jwt_syntax, but here it works for both contractors and users.
    """
    return user.id

@app.route('/login-contractor', methods=['POST'])
@cross_origin()
def login_contractor():
    """Contractorenticates contractors for login"""
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    contractor = Contractor.query.filter_by(email=email).one_or_none()
    if not contractor or not contractor.check_password(password):
        return jsonify({"message": "Wrong username or password"}), 401
    token = create_access_token(identity=contractor)
    response = jsonify({"access-token": token})
#    set_access_cookies(response, token)
    return response


@app.route('/login-user', methods=['POST'])
@cross_origin()
def login_user():
    """Userenticates users for login"""
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).one_or_none()
    if not user or not user.check_password(password):
        return jsonify({"message": "Wrong username or password"}), 401
    token = create_access_token(identity=user)
    response = jsonify({"access-token": token})
    #set_access_cookies(response, token)
    return response


@app.route("/current_user", methods=["GET"])
@cross_origin()
@jwt_required()
def protected_user():
    user_schema = UserSchema()
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    response = jsonify(user_schema.dump(user))
    return response

@app.route("/current_contractor", methods=["GET"])
@jwt_required()
def protected_contractor():
    contractor_schema = ContractorSchema()
    contractor_id = get_jwt_identity()
    contractor = Contractor.query.filter_by(id=contractor_id).first()
    return jsonify(contractor_schema.dump(contractor))
