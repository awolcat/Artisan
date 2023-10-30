#!/usr/bin/python3
"""
"""
from flask_app.api.v1.views import app_views
from flask import abort, jsonify, request
from models.contractors import Contractor
from models.user_reviews import UserReview
from models.bookings import Booking
from models.users import User
from models.schemas import ContractorSchema
from flask_app import db


contractor_schema = ContractorSchema()
contractors_schema = ContractorSchema(many=True)


@app_views.route('/contractors', methods=['GET'])
def get_contractors():
    """Get the list of all Contractors"""
    all_contractors = Contractor.query.all()
    contractors = contractors_schema.dump(all_contractors)
    return jsonify({"contractors": contractors})


@app_views.route('/contractors', methods=['POST'])
def post_contractor():
    """Creates a contractor"""
    data = request.get_json()
    if not data:
        abort(400, description='Not a JSON')
    for field in ['first_name', 'last_name', 'email', 'password']:
        if field not in data:
            abort(400, description=f"Missing {field}")
    contractor = Contractor(**data)
    contractor.new()
    contractor.save()
    return contractor_schema.jsonify(contractor)


@app_views.route('/contractors/<contractor_id>', methods=['GET'])
def get_contractor(contractor_id):
    """Gets a contractor by id"""
    contractor = Contractor.query.get(contractor_id)
    return contractor_schema.jsonify(contractor)


@app_views.route('/contractors/<contractor_id>', methods=['PUT'])
def update_contractor(contractor_id):
    """Updates a contractor by id"""
    contractor = Contractor.query.get(contractor_id)
    data = request.get_json()
    if not data:
        abort(400, description='Not a JSON')

    overlook = ['id', 'created_at', 'updated_at']
    for k, v in data.items():
        if k not in overlook:
            setattr(contractor, k, v)
    contractor.save()
    return contractor_schema.jsonify(contractor)


@app_views.route('/contractors/<contractor_id>/reviews/<n>', methods=['GET'])
def get_contractor_reviews_count(contractor_id, n):
    """ """
    contractor = Contractor.query.get(contractor_id)
    reviews = db.session.query(Contractor.first_name.label('contractor'),\
                               User.first_name.label('client'),\
                               UserReview.review)\
                       .join(Booking, Contractor.id == Booking.contractor_id)\
                       .join(UserReview, Booking.id == UserReview.booking_id)\
                       .join(User, User.id == Booking.user_id)\
                       .filter(Contractor.id == contractor_id).all()
    n = int(n)
    if n < 0:
        abort(400, description='Not a positive number')
    if n > 0:
        n_reviews = []
        for review in range(n):
            n_reviews.append(reviews[review])
        return jsonify({"reviews_recieved_count": len(n_reviews)})
    
    return jsonify({"reviews_recieved_count": len(reviews)})

@app_views.route('/contractors/<contractor_id>/reviews/<n>', methods=['POST'])
def post_contractor_reviews(contractor_id, n):
    """ """
    pass

#@app_views.route('', methods['GET'])
