from typing import Literal, Optional
from pydantic import BaseModel


class FlightPriceModel(BaseModel):
    trip_type: Literal["round", "oneway"]
    departure_id: str
    arrival_id: str
    outbound_date: str
    return_date: str | None = None
    currency: Literal["USD", "AUD"]
    adults: str
    children: str
    infants_on_lap: str
