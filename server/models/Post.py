from typing import Optional
from pydantic import BaseModel


class Model(BaseModel):
    title: str
    content: Optional[str] = ''
    published: Optional[bool] = False
