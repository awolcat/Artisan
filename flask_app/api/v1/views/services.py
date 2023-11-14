#!/usr/bin/python3
"""
"""
import json
from flask import abort, jsonify, request
from flask_app.api.v1.views import app_views
from models.services import Service
from models.contractors import Contractor
from models.schemas import ServiceSchema


service_schema = ServiceSchema()
services_schema = ServiceSchema(many=True)

@app_views.route('/services', methods=['GET'])
def get_services():
    """Returns a list of all services"""
    all_services = Service.query.all()
    services = services_schema.dump(all_services)
    return jsonify({"services": services})

@app_views.route('/services/<service_id>', methods=['GET'])
def get_service(service_id):
    """Returns a service by id"""
    service = Service.query.get(service_id)
    if not service:
        abort(404)
    return service_schema.jsonify(service)

@app_views.route('/services', methods=['POST'])
def post_service():
    """Creates a service"""
    data = request.get_json()
    if not data:
        abort(400, description='Not a JSON')
    required = ['name', 'description', 'contractor']
    for field in required:
        if field not in data:
            abort(400, description=f"Missing {field}")
    contractor = data.pop('contractor')
    service = Service(**data)
    service.new()
    service.contractors.append(Contractor.query.get(contractor['id']))
    #service.contractors.append(json.loads(contractor))
    #service.contractors.append(contractor)
    service.save()
    return service_schema.jsonify(service)
    
@app_views.route('/services/<service_id>', methods=['PUT'])
def update_service(service_id):
    """Updates a service by id"""
    service = Service.query.get(service_id)
    if not service:
        abort(404)
    data = request.get_json()
    if not data:
        abort(400, description='Not a JSON')
    overlook = ['id', 'created_at', 'updated_at']
    for k, v in data.items():
        if k not in overlook:
            setattr(service, k, v)
    service.save()
    return service_schema.jsonify(service)

@app_views.route('/services/<service_id>', methods=['DELETE'])
def delete_service(service_id):
    """Deletes a service from the database"""
    service = Service.query.get(service_id)
    if not service:
        abort(404)

    service.delete()
    service.save()
    return jsonify({})
