"""
- File: Predict.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Defines the data model for flight prediction requests
"""

from pydantic import BaseModel
from typing import Literal
from typing_extensions import Annotated, Doc, List, Any


class PredictRequestModel(BaseModel):
    """
    Data model for flight prediction requests

    Attributes:
        departure_date: Date of departure flight.
        departure_time: Time of departure flight.
        arrival_date: Date of arrival flight.
        arrival_time: Time of arrival flight.
        airline: Name of the airline.
        departure_city: City of departure.
        arrival_city: City of arrival.
        stops: Number of stops in the flight (direct, 1, or 2).
    """
    departure_date: Annotated[str, Doc("""Date of departure flight""")]
    departure_time: Annotated[str, Doc("""Time of departure flight""")]
    arrival_date: Annotated[str, Doc("""Date of arrival flight""")]
    arrival_time: Annotated[str, Doc("""Time of arrival flight""")]
    airline: Annotated[str, Doc("""Name of the airline""")]
    departure_city: Annotated[str, Doc("""City of departure""")]
    arrival_city: Annotated[str, Doc("""City of arrival""")]
    stops: Annotated[Literal["direct", "1", "2"], Doc("""Number of stops in the flight (direct, 1, or 2)""")] = "direct"

class PredictResponseModel(BaseModel):
    """
    Response model for flight price predictions.

    Attributes:
        predictions: Predicted flight price.
    """
    predictions: Annotated[float, Doc("""Predicted flight price""")]

class PriceDistributionModel(BaseModel):
    """
    Model for price distribution data.

    Attributes:
        range: Price range.
        count: Number of flights within the price range.
    """
    range: Annotated[str, Doc("""Price range""")]
    count: Annotated[int, Doc("""Number of flights""")]

class PriceTrendModel(BaseModel):
    """
    Model for price trend data.

    Attributes:
        month: Month of the year.
        price: Average price for the month.
    """
    month: Annotated[str, Doc("""Month""")]
    price: Annotated[float, Doc("""Price""")]

class SeasonalAnalysisModel(BaseModel):
    """
    Model for seasonal analysis data.

    Attributes:
        month: Month of the year.
        demand: Demand for flights in that month.
        price: Average price for the month.
    """
    month: Annotated[str, Doc("""Month""")]
    demand: Annotated[int, Doc("""Demand""")]
    price: Annotated[float, Doc("""Price""")]

class ChartDataResponseModel(BaseModel):
    """
    Response model for chart data including price distribution, price trend, and seasonal analysis.

    Attributes:
        price_distribution: Price distribution data.
        price_trend: Price trend data.
        seasonal_analysis: Seasonal analysis data.
    """
    price_distribution: Annotated[List[PriceDistributionModel], Doc("""Price distribution""")]
    price_trend: Annotated[List[PriceTrendModel], Doc("""Price trend""")]
    seasonal_analysis: Annotated[List[SeasonalAnalysisModel], Doc("""Seasonal analysis""")]
