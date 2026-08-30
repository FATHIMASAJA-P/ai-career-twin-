from sqlalchemy import Column, Integer, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship

from app.database.base import Base


class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    career_analysis_done = Column(Boolean, default=False)
    job_match_done = Column(Boolean, default=False)
    ats_done = Column(Boolean, default=False)

    # Store actual AI results
    career_analysis = Column(Text, nullable=True)
    job_match = Column(Text, nullable=True)
    ats_score = Column(Text, nullable=True)

    user = relationship("User")
    career_roadmap = Column(Text, nullable=True)