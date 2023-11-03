#!/usr/bin/python3
"""
"""
from flask_app import db
from flask_app.api.v1.views import app_views
from flask import abort, jsonify, request
from models.contractors import Contractor
from models.schemas import ContractorSchema
from flask_jwt_extended import jwt_required


contractor_schema = ContractorSchema()
contractors_schema = ContractorSchema(many=True)

@app_views.route('/contractors', methods=['GET'])
def get_contractors():
    """Get the list of all Contractors"""
    all_contractors = Contractor.query.all()
    contractors = contractors_schema.dump(all_contractors)
    return jsonify({"contractors": contractors})

@app_views.route('/contractors/<contractor_id>', methods=['GET'])
@jwt_required()
def get_contractor(contractor_id):
    """Gets a contractor by id"""
    contractor = Contractor.query.get(contractor_id)
    if not contractor:
        abort(404)
    return contractor_schema.jsonify(contractor)

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

@app_views.route('/contractors/<contractor_id>', methods=['PUT'])
def update_contractor(contractor_id):
    """Updates a contractor by id"""
    contractor = Contractor.query.get(contractor_id)
    if not contractor:
        abort(404)
    data = request.get_json()
    if not data:
        abort(400, description='Not a JSON')

    overlook = ['id', 'created_at', 'updated_at']
    for k, v in data.items():
        if k not in overlook:
            setattr(contractor, k, v)
    contractor.save()
    return contractor_schema.jsonify(contractor)

@app_views.route('/contractors/<contractor_id>', methods=['DELETE'])
def delete_contractor(contractor_id):
    """Deletes a contractor from the database
       WARNING: All associated bookings will be deleted,
       All associated offers will be deleted
    """
    contractor = Contractor.query.get(contractor_id)
    if not contractor:
        abort(404)

    for booking in contractor.bookings.all():
        booking.delete()
        booking.save()
    for offer in contractor.service_offers.all():
        offer.delete()
        offer.save()
    contractor.delete()
    contractor.save()
    return jsonify({})
