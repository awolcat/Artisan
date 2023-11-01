#!/usr/bin/python3
"""
"""
from flask import abort, jsonify, request
from flask_app.api.v1.views import app_views
from models.user_reviews import UserReview
from models.schemas import UserReviewSchema


user_review_schema = UserReviewSchema()
user_reviews_schema = UserReviewSchema(many=True)

@app_views.route('/user_reviews', methods=['GET'])
def get_user_reviews():
    """Returns a list of all user_reviews"""
    all_user_reviews = UserReview.query.all()
    user_reviews = user_reviews_schema.dump(all_user_reviews)
    return jsonify({"user_reviews": user_reviews})

@app_views.route('/user_reviews/<user_review_id>', methods=['GET'])
def get_user_review(user_review_id):
    """Returns a user_review by id"""
    user_review = UserReview.query.get(user_review_id)
    if not user_review:
        abort(404)
    return user_review_schema.jsonify(user_review)

@app_views.route('/user_reviews', methods=['POST'])
def post_user_review():
    """Creates a user_review"""
    data = request.get_json()
    if not data:
        abort(400, description='Not a JSON')
    required = ['booking_id']
    for field in required:
        if field not in data:
            abort(400, description=f"Missing {field}")
    user_review = UserReview(**data)
    user_review.new()
    user_review.save()
    return user_review_schema.jsonify(user_review)
    
@app_views.route('/user_reviews/<user_review_id>', methods=['PUT'])
def update_user_review(user_review_id):
    """Updates a user_review by id"""
    user_review = UserReview.query.get(user_review_id)
    if not user_review:
        abort(404)
    data = request.get_json()
    if not data:
        abort(400, description='Not a JSON')
    overlook = ['id', 'created_at', 'updated_at']
    for k, v in data.items():
        if k not in overlook:
            setattr(user_review, k, v)
    user_review.save()
    return user_review_schema.jsonify(user_review)

@app_views.route('/user_reviews/<user_review_id>', methods=['DELETE'])
def delete_user_review(user_review_id):
    """Deletes a user_review from the database"""
    user_review = UserReview.query.get(user_review_id)
    if not user_review:
        abort(404)

    user_review.delete()
    user_review.save()
    return jsonify({})
