#!/usr/bin/python3
"""This module contains a function that generates fake data and populates the 
   database with it.
"""
import random
from flask_app import db, bcrypt
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
    for _ in range(7):  # Creating 5 fake users
        user = User(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            password=fake.password(),
            email=fake.email(),
            phone_number=fake.phone_number(),
            address=fake.address()
        )
        db.session.add(user)
        db.session.commit()

    # Create fake services
    service_names = ["Plumbing", "Electrical", "Carpentry", "Painting", "Landscaping"]
    for service_name in service_names:
        service = Service(
            name=service_name,
            description=fake.text()
        )
        db.session.add(service)
        db.session.commit()

    # Create fake contractors
    for _ in range(7):  # Creating 3 fake contractors
        contractor = Contractor(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.email(),
            password=fake.password(),
            address=fake.address(),
            phone_number=fake.phone_number(),
            skills=fake.random_element(elements=("Conduit-pipes repair", "Electrical Wiring", "Custom chairs", "Murals", "Gardening", 'Mobile repairs')),
            occupation=fake.random_element(elements=('Plumber', 'Landscaper', '3D Painter', 'Electrician', 'Carpenter', 'Dry Cleaner', 'Security Officer', 'Phone Technician')),
        )
        db.session.add(contractor)
        db.session.commit()
        contractor.services.append(random.choice(Service.query.all()))
        contractor.services.append(random.choice(Service.query.all()))
        db.session.commit()

    # Create fake contracts
    for _ in range(5):  # Creating 5 fake contracts
        contract = Contract(
            user_id=fake.random_element(User.query.all()).id,
            service_id=fake.random_element(Service.query.all()).id,
            description=fake.text(),
            budget=fake.random_int(min=10000, max=500000) / 100,
            start_date=fake.date_this_year().strftime('%Y-%m-%d'),
            end_date=fake.date_this_year().strftime('%Y-%m-%d'),
            status=fake.random_element(elements=("open", "pending", "confirmed", "rejected", "completed"))
        )
        db.session.add(contract)
        db.session.commit()

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
        db.session.commit()

    # Create fake bookings
    for _ in range(10):  # Creating 10 fake bookings
        booking = Booking(
            user_id=fake.random_element(User.query.all()).id,
            contractor_id=fake.random_element(Contractor.query.all()).id,
            booking_date=fake.date_time_this_year(),
            status=fake.random_element(elements=("pending", "confirmed", "completed")),
            service_id=fake.random_element(Service.query.all()).id
        )
        # Randomly associate with a contract or service_offer
        if fake.boolean(chance_of_getting_true=50):
            booking.contract_id = fake.random_element(Contract.query.all()).id
        else:
            booking.service_offer_id = fake.random_element(ServiceOffer.query.all()).id
        db.session.add(booking)
        db.session.commit()

    # Create fake user reviews
    for _ in range(8):  # Creating 8 fake user reviews
        user_review = UserReview(
            review=fake.text(),
            rating=fake.random_int(min=1, max=5),
            booking_id=Booking.query.get(_ + 1).id
        )
        db.session.add(user_review)
        db.session.commit()

    # Commit the changes to the database
    db.session.commit()

    print("Fake records created successfully!")
