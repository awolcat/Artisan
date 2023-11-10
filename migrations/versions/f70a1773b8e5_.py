"""empty message

Revision ID: f70a1773b8e5
Revises: e19302773380
Create Date: 2023-11-04 23:37:18.194500

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'f70a1773b8e5'
down_revision = 'e19302773380'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('booking', schema=None) as batch_op:
        batch_op.drop_constraint('booking_ibfk_3', type_='foreignkey')
        batch_op.drop_column('service_offer_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('booking', schema=None) as batch_op:
        batch_op.add_column(sa.Column('service_offer_id', mysql.INTEGER(), autoincrement=False, nullable=True))
        batch_op.create_foreign_key('booking_ibfk_3', 'service_offer', ['service_offer_id'], ['id'])

    # ### end Alembic commands ###