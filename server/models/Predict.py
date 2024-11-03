"""
- File: Predict.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Defines the data model for flight prediction requests
"""

from pydantic import BaseModel
from typing import Literal
from typing_extensions import Annotated, Doc


class PredictRequestModel(BaseModel):
    """
    Data model for flight prediction requests

    Attributes:
        departure_date: Date of departure flight
        departure_time: Time of departure flight
        arrival_date: Date of arrival flight
        arrival_time: Time of arrival flight
        airline: Name of the airline
        departure_city: City of departure
        arrival_city: City of arrival
        stops: Number of stops in the flight
    """
    departure_date: Annotated[str, Doc("""Date of departure flight""")]
    departure_time: Annotated[str, Doc("""Time of departure flight""")]
    arrival_date: Annotated[str, Doc("""Date of arrival flight""")]
    arrival_time: Annotated[str, Doc("""Time of arrival flight""")]
    airline: Annotated[str, Doc("""Name of the airline""")]
    departure_city: Annotated[str, Doc("""City of departure""")]
    arrival_city: Annotated[str, Doc("""City of arrival""")]
    stops: Annotated[Literal["direct", "1", "2"], Doc("""Number of stops in the flight""")] = "direct"
