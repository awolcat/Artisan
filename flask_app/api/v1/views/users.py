#!/usr/bin/python3
"""
"""
from flask_app.api.v1.views import app_views
from flask import abort, jsonify, request
from models.users import User
from models.schemas import UserSchema


user_schema = UserSchema()
users_schema = UserSchema(many=True)

@app_views.route('/users', methods=['GET'])
def get_users():
    """Get the list of all Users"""
    all_users = User.query.all()
    users = users_schema.dump(all_users)
    return jsonify({"users": users})

@app_views.route('/users/<user_id>', methods=['GET'])
def get_user(user_id):
    """Gets a user by id"""
    user = User.query.get(user_id)
    if not user:
        abort(404)
    return user_schema.jsonify(user)

@app_views.route('/users', methods=['POST'])
def post_user():
    """Creates a user"""
    data = request.get_json()
    if not data:
        abort(400, description='Not a JSON')
    for field in ['first_name', 'last_name', 'email', 'password']:
        if field not in data:
            abort(400, description=f"Missing {field}")
    user = User(**data)
    user.new()
    user.save()
    return user_schema.jsonify(user)

@app_views.route('/users/<user_id>', methods=['PUT'])
def update_user(user_id):
    """Updates a user by id"""
    user = User.query.get(user_id)
    if not user:
        abort(404)
    data = request.get_json()
    if not data:
        abort(400, description='Not a JSON')
    overlook = ['id', 'created_at', 'updated_at']
    for k, v in data.items():
        if k not in overlook:
            setattr(user, k, v)
    user.save()
    return user_schema.jsonify(user)

@app_views.route('/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    """Deletes a user from the database"""
    user = User.query.get(user_id)
    if not user:
        abort(404)

    for booking in user.bookings.all():
        booking.delete()
        booking.save()
    for contract in user.contracts.all():
        contract.delete()
        contract.save()
    user.delete()
    user.save()
    return jsonify({})
