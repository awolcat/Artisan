#!/usr/bin/python3
"""
"""
from flask import abort, jsonify, request
from flask_app.api.v1.views import app_views
from models.contracts import Contract
from models.schemas import ContractSchema


contract_schema = ContractSchema()
contracts_schema = ContractSchema(many=True)

@app_views.route('/contracts', methods=['GET'])
def get_contracts():
    """Returns a list of all contracts"""
    all_contracts = Contract.query.all()
    contracts = contracts_schema.dump(all_contracts)
    return jsonify(contracts)

@app_views.route('/contracts/<contract_id>', methods=['GET'])
def get_contract(contract_id):
    """Returns a contract by id"""
    contract = Contract.query.get(contract_id)
    if not contract:
        abort(404)
    return contract_schema.jsonify(contract)

@app_views.route('/contracts', methods=['POST'])
def post_contract():
    """Creates a contract"""
    data = request.get_json()
    if not data:
        abort(400, description='Not a JSON')
    required = ['user_id', 'budget', 'start_date', 'end_date']
    for field in required:
        if field not in data:
            abort(400, description=f"Missing {field}")
    contract = Contract(**data)
    contract.new()
    contract.save()
    return contract_schema.jsonify(contract)
    
@app_views.route('/contracts/<contract_id>', methods=['PUT'])
def update_contract(contract_id):
    """Updates a contract by id"""
    contract = Contract.query.get(contract_id)
    if not contract:
        abort(404)
    data = request.get_json()
    if not data:
        abort(400, description='Not a JSON')
    overlook = ['id', 'created_at', 'updated_at']
    for k, v in data.items():
        if k not in overlook:
            setattr(contract, k, v)
    contract.save()
    return contract_schema.jsonify(contract)

@app_views.route('/contracts/<contract_id>', methods=['DELETE'])
def delete_contract(contract_id):
    """Deletes a contract from the database
       All associated bookings will be GONE!
    """
    contract = Contract.query.get(contract_id)
    if not contract:
        abort(404)

    for booking in contract.bookings.all():
        booking.delete()
        booking.save()
    contract.delete()
    contract.save()
    return jsonify({})
