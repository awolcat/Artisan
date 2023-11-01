#!/usr/bin/python3
"""Flask application
"""
from flask import Flask, make_response, jsonify
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_cors import CORS


app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)
app.url_map.strict_slashes = False

cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})


@app.errorhandler(404)
def not_found(e):
    """
    """
    return make_response(jsonify({"error": "Not Found"}), 404)


from flask_app.events import *

def add_all(objects_list):
    """
    """
    for obj in objects_list:
        db.session.add(obj)
    db.session.commit()


from flask_app.seed import populate_db
from flask_app.api.v1.views import app_views
app.register_blueprint(app_views)
