#!/usr/bin/python3
import uuid
from flask_app import db, ma
from datetime import datetime


class Base:
    """Superclass from which other model classes subclass.
    """

    id = db.Column(db.String(60), primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, **kwargs):
        """Initialises a class
        """
        if kwargs:
            for key, value in kwargs.items():
                if key != "__class__":
                    setattr(self, key, value)
        else:
            self.id = str(uuid.uuid4())
            self.created_at = datetime.utcnow()
            self.updated_at = self.created_at

    def __str__(self):
        """String representation of the class
        """
        return "[{}]: {}".format(self.__class__.__name__, self.__dict__)

    def __repr__(self):
        """Obj representation of the class
        """
        return "[{}]: {}".format(self.__class__.__name__, self.__dict__)

	def new(self):
		"""Adds a new entry to the database
		"""
		db.session.add(self)

	def save(self):
		"""Saves to the db session
		"""
		self.updated_at = datetime.utcnow
		db.session.commit()

	def delete(self):
		"""Deletes from the current db session
		"""
		db.session.delete(self)

class BaseSchema(ma.SQLAlchemyAutoSchema):
	"""Generate Base model schema
	"""
	class Meta:
		model = Base
		include_fk = True
