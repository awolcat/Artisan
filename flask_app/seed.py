#!/usr/bin/python3
"""
function for data population
"""
from faker import Faker
from faker.providers import BaseProvider
import random


def populate_db():
    """
    """
    from flask_app import db
    from models.base import Base
    from models.users import User
    from models.bookings import Booking
    from models.contractors import Contractor
    from models.portfolios import Portfolio
    from models.services import Service
    from models.user_reviews import UserReview

    class CustomProvider(BaseProvider):

        def occupation(self):
            return self.random_element(
                elements=('Carpenter', 'Electrician', 'Plumber', 'Painter', 'Mechanic', 'Cleaner',
                          'Technician'))

        def skills(self):
            return self.random_element(
                elements=('cleaning', 'house wiring', 'bulb repairs', 'plumbing', 'inverter installation',
                          'DSTV repair', 'phone engineer', 'Iron repair', 'Borehole Drilling',
                          'House painting', 'Office murals'))

        def custom_address(self):
            street_address = fk.street_address()
            city = fk.city()
            state = fk.state()
            zip_code = fk.zipcode()
            country = fk.country()

            address_parts = [street_address, city, state, zip_code, country]
            formatted_address = ', '.join(
                part for part in address_parts if part)
            return formatted_address

        def service(self):
            return self.random_element(elements=('DSTV repair', 'phone engineer', 'Iron repair', 'Landscaping',
                                                 'HVAC',
                                                 'Appliance Repair', 'Computer Repair','errands', 'internet',
                                                 'Baby sitting', 'Plumbing', 'Painting', 'Carpentry', 'Cleaning'))

        def category(self):
            return self.random_element(elements=('Electrical', 'Building & Contruction', 'Menial', 'Outdoor(eg Gardening)'))

    fk = Faker()
    fk.add_provider(CustomProvider)

    all_obj = []
    for _ in range(10):
        user = User(
            first_name=fk.first_name(),
            last_name=fk.last_name(),
            password=fk.password(length=5),
            email=fk.email()
        )

        contractor = Contractor(
            first_name=fk.first_name(),
            last_name=fk.last_name(),
            email=fk.email(),
            password=fk.password(length=10),
            occupation=fk.occupation(),
            skills=fk.skills(),
            address=fk.custom_address()
        )

        portfolio = Portfolio(
            description=fk.text(max_nb_chars=60),
            contractor=contractor
        )

        service = Service(
            name=fk.service(),
            category=fk.category(),
            price=fk.random_number(digits=3) + fk.random_number(digits=3) / 1000,
            contractors=[contractor]
        )

        booking = Booking(
            user=user,
            contractor=contractor,
            service=service
        )

        user_review = UserReview(
            review=fk.text(max_nb_chars=45),
            rating=random.randint(1, 5),
            booking=booking,
            user=user
        )

        all_obj.extend([user, contractor, portfolio, service, booking, user_review])

    for obj in all_obj:
        db.session.add(obj)
        db.session.commit()
