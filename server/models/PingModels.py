
from pydantic import BaseModel

class PingModel(BaseModel):
    """Model for ping response"""
    message: str
