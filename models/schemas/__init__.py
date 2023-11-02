#!/user/bin/python3
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


"""
class BaseSchema(ma.SQLAlchemyAutoSchema):
    Generate Base model schema
    
    class Meta:
        model = Base
        include_fk = True
"""
class UserReviewSchema(ma.SQLAlchemyAutoSchema):
    """Generate UserReview model schema
    """
    class Meta:
        model = UserReview
        include_fk = True
        exclude = ('created_at', 'updated_at')


class BookingSchema(ma.SQLAlchemyAutoSchema):
    """Generate Booking model schema
    """
    class Meta:
        model = Booking
        include_fk = True
        exclude = ('created_at', 'updated_at')
    user_reviews = ma.Nested(UserReviewSchema, many=True)


class ServiceSchema(ma.SQLAlchemyAutoSchema):
    """Generate Service model schema
    """
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


class ContractorSchema(ma.SQLAlchemyAutoSchema):
    """Generate Contractor model schema
    """
    service_offers = ma.Nested(ServiceOfferSchema, many=True)
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
