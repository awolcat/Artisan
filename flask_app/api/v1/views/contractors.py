#!/usr/bin/python3
"""
"""
from flask_app.api.v1.views import api
from flask import abort, jsonify, request
from models.contractors import Contractor
from models.schemas import ContractorSchema
from flask_restx import Resource, Namespace


ns = Namespace("api")
contractor_schema = ContractorSchema()
contractors_schema = ContractorSchema(many=True)


@ns.route('/contractors', methods=['GET'])
class ContractorsResource(Resource):
    @ns.doc(description='Get the list of all Contractors')
    def get(self):
        all_contractors = Contractor.query.all()
        contractors = contractors_schema.dump(all_contractors)
        return jsonify({"contractors": contractors})

api.add_namespace(ns)
