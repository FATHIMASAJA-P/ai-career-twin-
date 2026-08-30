import os

from dotenv import load_dotenv
from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import sessionmaker

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./career_twin.db.migrated"
)


# SQLite configuration
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False}
    )

# PostgreSQL / Neon configuration
else:
    engine = create_engine(DATABASE_URL)


SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


def add_missing_columns():
    inspector = inspect(engine)
    table_names = inspector.get_table_names()

    missing_columns = []

    if "activities" in table_names:
        activity_columns = {
            column["name"]
            for column in inspector.get_columns("activities")
        }

        if "career_roadmap" not in activity_columns:
            missing_columns.append(
                "ALTER TABLE activities ADD COLUMN career_roadmap TEXT"
            )

    if "users" in table_names:
        user_columns = {
            column["name"]
            for column in inspector.get_columns("users")
        }

        if "reset_token" not in user_columns:
            missing_columns.append(
                "ALTER TABLE users ADD COLUMN reset_token VARCHAR"
            )

        if "reset_token_expires" not in user_columns:
            missing_columns.append(
                "ALTER TABLE users ADD COLUMN reset_token_expires TIMESTAMP"
            )

    if missing_columns:
        with engine.begin() as connection:
            for statement in missing_columns:
                connection.execute(text(statement))


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()