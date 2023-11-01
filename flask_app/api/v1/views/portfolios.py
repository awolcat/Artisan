#!/usr/bin/python3
"""
"""
from flask import abort, jsonify, request
from flask_app.api.v1.views import app_views
from models.portfolios import Portfolio
from models.schemas import PortfolioSchema


portfolio_schema = PortfolioSchema()
portfolios_schema = PortfolioSchema(many=True)

@app_views.route('/portfolios', methods=['GET'])
def get_portfolios():
    """Returns a list of all portfolios"""
    all_portfolios = Portfolio.query.all()
    portfolios = portfolios_schema.dump(all_portfolios)
    return jsonify({"portfolios": portfolios})

@app_views.route('/portfolios/<portfolio_id>', methods=['GET'])
def get_portfolio(portfolio_id):
    """Returns a portfolio by id"""
    portfolio = Portfolio.query.get(portfolio_id)
    if not portfolio:
        abort(404)
    return portfolio_schema.jsonify(portfolio)

@app_views.route('/portfolios', methods=['POST'])
def post_portfolio():
    """Creates a portfolio"""
    data = request.get_json()
    if not data:
        abort(400, description='Not a JSON')
    required = ['description', 'contractor_id']
    for field in required:
        if field not in data:
            abort(400, description=f"Missing {field}")
    portfolio = Portfolio(**data)
    portfolio.new()
    portfolio.save()
    return portfolio_schema.jsonify(portfolio)
    
@app_views.route('/portfolios/<portfolio_id>', methods=['PUT'])
def update_portfolio(portfolio_id):
    """Updates a portfolio by id"""
    portfolio = Portfolio.query.get(portfolio_id)
    if not portfolio:
        abort(404)
    data = request.get_json()
    if not data:
        abort(400, description='Not a JSON')
    overlook = ['id', 'created_at', 'updated_at']
    for k, v in data.items():
        if k not in overlook:
            setattr(portfolio, k, v)
    portfolio.save()
    return portfolio_schema.jsonify(portfolio)

@app_views.route('/portfolios/<portfolio_id>', methods=['DELETE'])
def delete_portfolio(portfolio_id):
    """Deletes a portfolio from the database"""
    portfolio = Portfolio.query.get(portfolio_id)
    if not portfolio:
        abort(404)

    portfolio.delete()
    portfolio.save()
    return jsonify({})
