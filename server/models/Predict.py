from pydantic import BaseModel
from typing import Literal

class PredictRequestModel(BaseModel):
    departure_date: str
    departure_time: str
    arrival_date: str
    arrival_time: str
    airline: str
    departure_city: str
    arrival_city: str
    stops: Literal["direct", "1", "2"] = "direct"

