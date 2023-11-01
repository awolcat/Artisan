#!/usr/bin/python3
"""
"""
from flask_app import db
from sqlalchemy import event
from models.users import User
from models.services import Service
from models.contractors import Contractor
from models.contracts import Contract
from models.service_offers import ServiceOffer


"""
def mark_bookings_as_inactive(mapper, connection, target):
#    Define a function to be called before a contract or service_offer is deleted
    if isinstance(target, Contract):
        if target.status == 'open':
            try:
                raise Exception("Please close contract first")
            except Exception as e:
                print(str(e))
                db.session.rollback()
        for booking in target.bookings.all():
            booking.mark_as_inactive_user()
    elif isinstance(target, ServiceOffer):
        if target.status == 'available' :
            try:
                raise Exception("Please make service offer unavailable first")
            except Exception as e:
                print(str(e))
                db.session.rollback()
        for booking in target.bookings.all():
            booking.mark_as_inactive_contractor()

event.listen(ServiceOffer, 'before_delete', mark_bookings_as_inactive)
event.listen(Contract, 'before_delete', mark_bookings_as_inactive)
"""

"""
@event.listens_for(Contractor, 'before_delete')
def delete_contractor_bookings(mapper, connection, target):
    for booking in target.bookings.all():
        booking.delete()
        booking.save()"""


def disassociate_services(mapper, connection, target):
    """Disassociates services from a contractor before delete"""
    contractor_services = target.services.all()

    for service in contractor_services:
        target.services.remove(service)

event.listen(Contractor, 'before_delete', disassociate_services)


def disassociate_contractors(mapper, connection, target):
    """Disassociates contractors from a service before delete"""
    service_contractors = target.contractors.all()

    for contractor in service_contractors:
        target.contractors.remove(contractor)

event.listen(Service, 'before_delete', disassociate_contractors)

"""
def before_flush(session, flush_context, instances):
#    Checks if requirements to delete user or contractor are met
    for obj in session.deleted:
        if isinstance(obj, Contractor):
            for service_offer in obj.service_offers.all():
                if service_offer.status == 'available':
                    raise Exception("Please make all service offers unavailable first")
        elif isinstance(obj, User):
            for contract in obj.contracts.all():
                if contract.status == 'open':
                    raise Exception("Please close all open contracts first")

event.listen(db.session, 'before_flush', before_flush)
"""
