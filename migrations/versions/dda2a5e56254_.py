"""empty message

Revision ID: dda2a5e56254
Revises: 8ca60a732084
Create Date: 2023-10-28 11:05:20.183149

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dda2a5e56254'
down_revision = '8ca60a732084'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('portfolio', schema=None) as batch_op:
        batch_op.drop_constraint('portfolio_ibfk_1', type_='foreignkey')
        batch_op.create_foreign_key(None, 'contractor', ['contractor_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('portfolio', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('portfolio_ibfk_1', 'contractor', ['contractor_id'], ['id'], ondelete='CASCADE')

    # ### end Alembic commands ###
