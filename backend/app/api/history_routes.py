from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.dependencies.auth_dependency import get_current_user
from app.models.user import User
from app.models.history import History

router = APIRouter()

@router.get("/history")
def get_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    history = (
        db.query(History)
        .filter(History.user_id == current_user.id)
        .order_by(History.id.desc())
        .all()
    )

    return history