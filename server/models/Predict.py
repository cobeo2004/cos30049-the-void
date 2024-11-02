from pydantic import BaseModel
from typing import Literal

class PredictRequestModel(BaseModel):
    Departure_date: str
    Departure_time: str
    Arrival_date: str
    Arrival_time: str
    airline: str
    departure_city: str
    arrival_city: str
    Stops: Literal["direct", "one", "two"] = "direct"

