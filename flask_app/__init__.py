#!/usr/bin/python3
"""Flask application.
"""
from flask import Flask, make_response, jsonify
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from datetime import datetime, timezone, timedelta
from flask_jwt_extended import JWTManager, get_jwt, create_access_token
from flask_jwt_extended import set_access_cookies, get_jwt_identity


app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app, session_options={"autoflush": False})
ma = Marshmallow(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)
app.url_map.strict_slashes = False

cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"},
                            r"/*": {"origins": "*"}})


@app.errorhandler(404)
def not_found(e):
    """Custom handler for when a resource is not found on the server
    """
    return make_response(jsonify({"error": "Not Found"}), 404)


@app.after_request
def refresh_expiring_jwts(response):
    """Refreshes JSON Web Token before expiry,
       JWT are used for login authentication.
    """
    try:
        expiry_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(hours=10))
        if target_timestamp > expiry_timestamp:
            token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access-token"] = token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response


from flask_app.events import *    
from flask_app.login import *
from flask_app.logout import *
from flask_app.seed import populate_db
from flask_app.api.v1.views import app_views
app.register_blueprint(app_views)
