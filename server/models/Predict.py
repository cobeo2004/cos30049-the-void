from pydantic import BaseModel

class PredictRequestModel(BaseModel):
    Departure_date: str
    Departure_time: str
    Arrival_date: str
    Arrival_time: str
    airline: str
    departure_city: str
    arrival_city: str
    Stops: str = "direct"

