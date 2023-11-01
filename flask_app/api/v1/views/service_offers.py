#!/usr/bin/python3
"""
"""
from flask import abort, jsonify, request
from flask_app.api.v1.views import app_views
from models.service_offers import ServiceOffer
from models.schemas import ServiceOfferSchema


service_offer_schema = ServiceOfferSchema()
service_offers_schema = ServiceOfferSchema(many=True)

@app_views.route('/service_offers', methods=['GET'])
def get_service_offers():
    """Returns a list of all service_offers"""
    all_service_offers = ServiceOffer.query.all()
    service_offers = service_offers_schema.dump(all_service_offers)
    return jsonify({"service_offers": service_offers})

@app_views.route('/service_offers/<service_offer_id>', methods=['GET'])
def get_service_offer(service_offer_id):
    """Returns a service_offer by id"""
    service_offer = ServiceOffer.query.get(service_offer_id)
    if not service_offer:
        abort(404)
    return service_offer_schema.jsonify(service_offer)

@app_views.route('/service_offers', methods=['POST'])
def post_service_offer():
    """Creates a service_offer"""
    data = request.get_json()
    if not data:
        abort(400, description='Not a JSON')
    required = ['name', 'contractor_id']
    for field in required:
        if field not in data:
            abort(400, description=f"Missing {field}")
    service_offer = ServiceOffer(**data)
    service_offer.new()
    service_offer.save()
    return service_offer_schema.jsonify(service_offer)
    
@app_views.route('/service_offers/<service_offer_id>', methods=['PUT'])
def update_service_offer(service_offer_id):
    """Updates a service_offer by id"""
    service_offer = ServiceOffer.query.get(service_offer_id)
    if not service_offer:
        abort(404)
    data = request.get_json()
    if not data:
        abort(400, description='Not a JSON')
    overlook = ['id', 'created_at', 'updated_at']
    for k, v in data.items():
        if k not in overlook:
            setattr(service_offer, k, v)
    service_offer.save()
    return service_offer_schema.jsonify(service_offer)

@app_views.route('/service_offers/<service_offer_id>', methods=['DELETE'])
def delete_service_offer(service_offer_id):
    """Deletes a service_offer from the database"""
    service_offer = ServiceOffer.query.get(service_offer_id)
    if not service_offer:
        abort(404)

    for booking in service_offer.bookings.all():
        booking.delete()
        booking.save()
    service_offer.delete()
    service_offer.save()
    return jsonify({})
