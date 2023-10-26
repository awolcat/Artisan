#!/usr/bin/python3
"""Flask application
"""
from flask import Flask
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
#cors = CORS(app, resources={r"/*": {"origins": "*"}})
cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})


from flask_app.api.v1.views import api_views
app.register_blueprint(api_views)


