#!/usr/bin/python3
"""
"""
from flask_app.api.v1.views import api_views
from flask import abort, jsonify, request
from models.contractors import Contractor
from models.schemas import ContractorSchema


contractor_schema = ContractorSchema()
contractors_schema = ContractorSchema(many=True)

@api_views.route('/contractors', methods=['GET'])
def get_contractors():
    """Returns a dictionary of contractors
    """
    all_contractors = Contractor.query.all()
    contractors = contractors_schema.dump(all_contractors)
    return jsonify({"contractors": contractors})

