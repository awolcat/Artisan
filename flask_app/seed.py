#!/usr/bin/python3
"""
"""
from flask_app import db
from faker import Faker
from datetime import datetime
from models.base import Base
from models.users import User
from models.bookings import Booking
from models.contractors import Contractor
from models.portfolios import Portfolio
from models.services import Service
from models.user_reviews import UserReview
from models.contracts import Contract
from models.service_offers import ServiceOffer


fake = Faker()

def populate_db():
    # Create fake users
    for _ in range(5):  # Creating 5 fake users
        user = User(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            password=fake.password(),
            email=fake.email(),
            phone_number=fake.phone_number(),
            address=fake.address()
        )
        db.session.add(user)

    # Create fake services
    service_names = ["Plumbing", "Electrical", "Carpentry", "Painting", "Landscaping"]
    for service_name in service_names:
        service = Service(
            name=service_name,
            description=fake.text()
        )
        db.session.add(service)

    # Create fake contractors
    for _ in range(3):  # Creating 3 fake contractors
        contractor = Contractor(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.email(),
            password=fake.password(),
            address=fake.address(),
            phone_number=fake.phone_number(),
            skills=fake.random_element(elements=("Conduit-pipes repair", "Electrical Wiring", "Custom chairs", "Murals", "Gardening")),
            occupation=fake.job(),
        )
        db.session.add(contractor)

    # Create fake contracts
    for _ in range(5):  # Creating 5 fake contracts
        contract = Contract(
            user_id=fake.random_element(User.query.all()).id,
            service_id=fake.random_element(Service.query.all()).id,
            description=fake.text(),
            budget=fake.random_int(min=10000, max=500000) / 100,
            start_date=fake.date_this_year().strftime('%Y-%m-%d'),
            end_date=fake.date_this_year().strftime('%Y-%m-%d'),
            status=fake.random_element(elements=("open", "closed"))
        )
        db.session.add(contract)

    # Create fake service offers
    for _ in range(5):  # Creating 5 fake service offers
        service_offer = ServiceOffer(
            contractor_id=fake.random_element(Contractor.query.all()).id,
            name=fake.random_element(elements=("Sink blockage repair ", "Full house Wiring", "Make office desk", "Exterior wall Murals", "Beautify your garden")),
            description=fake.text(),
            price=fake.random_int(min=10000, max=500000) / 100,
            status=fake.random_element(elements=("available", "unavailable"))
        )
        db.session.add(service_offer)

    # Create fake bookings
    for _ in range(10):  # Creating 10 fake bookings
        booking = Booking(
            user_id=fake.random_element(User.query.all()).id,
            contractor_id=fake.random_element(Contractor.query.all()).id,
            booking_date=fake.date_time_this_year(),
            status=fake.random_element(elements=("pending", "confirmed", "cancelled", "completed")),
        )
        # Randomly associate with a contract or service_offer
        if fake.boolean(chance_of_getting_true=50):
            booking.contract_id = fake.random_element(Contract.query.all()).id
        else:
            booking.service_offer_id = fake.random_element(ServiceOffer.query.all()).id
        db.session.add(booking)

    # Create fake user reviews
    for _ in range(8):  # Creating 8 fake user reviews
        user_review = UserReview(
            review=fake.text(),
            rating=fake.random_int(min=1, max=5),
            booking_id=fake.random_element(Booking.query.all()).id
        )
        db.session.add(user_review)

    # Commit the changes to the database
    db.session.commit()

    print("Fake records created successfully!")
