"""empty message

Revision ID: e21f57ffa892
Revises: c7ff7fd63fb1
Create Date: 2023-11-14 14:51:10.750866

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e21f57ffa892'
down_revision = 'c7ff7fd63fb1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('contractor', schema=None) as batch_op:
        batch_op.add_column(sa.Column('hashed_password', sa.String(length=128), nullable=True))

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('hashed_password', sa.String(length=128), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('hashed_password')

    with op.batch_alter_table('contractor', schema=None) as batch_op:
        batch_op.drop_column('hashed_password')

    # ### end Alembic commands ###
