from pydantic import BaseModel


class ResumeResponse(BaseModel):
    id: int
    filename: str
    file_path: str

    class Config:
        from_attributes = True