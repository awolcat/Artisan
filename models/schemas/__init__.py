#!/user/bin/python3
"""This module contains schema class definitions. These definitions are
   necessary for marshmallow-sqlalchemy to function properly.
   The schema defines what is returned by an object when queried.
"""
from flask_app import ma
from models.base import Base
from models.users import User
from models.bookings import Booking
from models.contractors import Contractor
from models.portfolios import Portfolio
from models.services import Service
from models.contracts import Contract
from models.user_reviews import UserReview
from models.service_offers import ServiceOffer



class UserReviewSchema(ma.SQLAlchemyAutoSchema):
    """Generate UserReview model schema
    """
    class Meta:
        model = UserReview
        include_fk = True
        exclude = ('created_at', 'updated_at')

    
class ServiceSchema(ma.SQLAlchemyAutoSchema):
    """Generate Service model schema
    """
    contractors = ma.Nested("ContractorSchema", many=True, exclude=('services', 'service_offers',))
    class Meta:
        model = Service
        include_fk = True
        exclude = ('created_at', 'updated_at')

    
class ServiceOfferSchema(ma.SQLAlchemyAutoSchema):
    """Generate ServiceOffer model schema
    """
    class Meta:
        model = ServiceOffer
        include_fk = True
        exclude = ('created_at', 'updated_at')


class BookingSchema(ma.SQLAlchemyAutoSchema):
    """Generate Booking model schema
    """
    class Meta:
        model = Booking
        include_fk = True
        exclude = ('created_at', 'updated_at')
    user_reviews = ma.Nested(UserReviewSchema, exclude=('booking_id',))


class ContractorSchema(ma.SQLAlchemyAutoSchema):
    """Generate Contractor model schema
    """
    bookings = ma.Nested(BookingSchema, many=True)
    service_offers = ma.Nested(ServiceOfferSchema, many=True, exclude=('contractor_id',))
    services = ma.Nested("ServiceSchema", many=True, exclude=('contractors',))
    porfolios = ma.Nested("PortfolioSchema")
    class Meta:
        model = Contractor
        include_fk = True
        exclude = ('created_at', 'updated_at')

    
class PortfolioSchema(ma.SQLAlchemyAutoSchema):
    """Generate Portfolio model schema
    """
    class Meta:
        model = Portfolio
        include_fk = True
        exclude = ('created_at', 'updated_at')


class UserSchema(ma.SQLAlchemyAutoSchema):
    """Generate User model schema
    """
    class Meta:
        model = User
        include_fk = True
        exclude = ('created_at', 'updated_at')
    bookings = ma.Nested("BookingSchema", many=True)
    contracts = ma.Nested("ContractSchema", many=True)

class ContractSchema(ma.SQLAlchemyAutoSchema):
    """Generate Contract model schema
    """
    class Meta:
        model = Contract
        include_fk = True
        exclude = ('created_at', 'updated_at')

class ServiceOfferSchema(ma.SQLAlchemyAutoSchema):
    """Generate ServiceOffer model schema
    """
    class Meta:
        model = ServiceOffer
        include_fk = True
        exclude = ('created_at', 'updated_at')
