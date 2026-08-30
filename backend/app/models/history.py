from sqlalchemy import Column, Integer, Text, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class History(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    analysis_type = Column(String, nullable=False)
    result = Column(Text, nullable=False)

    user = relationship("User")