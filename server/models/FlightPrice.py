"""
- File: FlightPrice.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Defines the data model for flight price search parameters
"""

from typing import Literal, Optional
from pydantic import BaseModel
from typing_extensions import Annotated, Doc


class FlightPriceModel(BaseModel):
    """
    Data model for flight price search parameters

    Attributes:
        trip_type: Type of trip (round-trip or one-way)
        departure_id: ID of departure location
        arrival_id: ID of arrival location
        outbound_date: Date of outbound flight
        return_date: Date of return flight (optional)
        currency: Currency for price display
        adults: Number of adult passengers
        children: Number of child passengers
        infants_on_lap: Number of lap infant passengers
    """
    trip_type: Annotated[Literal["round", "oneway"], Doc("""Type of trip (round-trip or one-way)""")]
    departure_id: Annotated[str, Doc("""ID of departure location""")]
    arrival_id: Annotated[str, Doc("""ID of arrival location""")]
    outbound_date: Annotated[str, Doc("""Date of outbound flight""")]
    return_date: Annotated[Optional[str], Doc("""Date of return flight""")] = None
    currency: Annotated[Literal["USD", "AUD"], Doc("""Currency for price display""")]
    adults: Annotated[str, Doc("""Number of adult passengers""")]
    children: Annotated[str, Doc("""Number of child passengers""")]
    infants_on_lap: Annotated[str, Doc("""Number of lap infant passengers""")]
