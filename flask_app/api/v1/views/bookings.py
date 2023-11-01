#!/usr/bin/python3
"""
"""
from flask import abort, jsonify, request
from flask_app.api.v1.views import app_views
from models.bookings import Booking
from models.schemas import BookingSchema


booking_schema = BookingSchema()
bookings_schema = BookingSchema(many=True)

@app_views.route('/bookings', methods=['GET'])
def get_bookings():
    """Returns a list of all bookings"""
    all_bookings = Booking.query.all()
    bookings = bookings_schema.dump(all_bookings)
    return jsonify({"bookings": bookings})

@app_views.route('/bookings/<booking_id>', methods=['GET'])
def get_booking(booking_id):
    """Returns a booking by id"""
    booking = Booking.query.get(booking_id)
    if not booking:
        abort(404)
    return booking_schema.jsonify(booking)

@app_views.route('/bookings', methods=['POST'])
def post_booking():
    """Creates a booking"""
    data = request.get_json()
    if not data:
        abort(400, description='Not a JSON')
    required = ['user_id', 'contractor_id']
    for field in required:
        if field not in data:
            abort(400, description=f"Missing {field}")
    booking = Booking(**data)
    booking.new()
    booking.save()
    return booking_schema.jsonify(booking)
    
@app_views.route('/bookings/<booking_id>', methods=['PUT'])
def update_booking(booking_id):
    """Updates a booking by id"""
    booking = Booking.query.get(booking_id)
    if not booking:
        abort(404)
    data = request.get_json()
    if not data:
        abort(400, description='Not a JSON')
    overlook = ['id', 'created_at', 'updated_at']
    for k, v in data.items():
        if k not in overlook:
            setattr(booking, k, v)
    booking.save()
    return booking_schema.jsonify(booking)

@app_views.route('/bookings/<booking_id>', methods=['DELETE'])
def delete_booking(booking_id):
    """Deletes a booking from the database"""
    booking = Booking.query.get(booking_id)
    if not booking:
        abort(404)

    booking.delete()
    booking.save()
    return jsonify({})
