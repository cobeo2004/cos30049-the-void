"""
- File: Destination.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Data model for airport/destination information
"""

from pydantic import BaseModel


class DestinationModel(BaseModel):
    """
    Data model representing an airport/destination

    Attributes:
        country_code: Two-letter country code (e.g., 'US', 'GB')
        region_name: Name of the region/city
        iata: IATA airport code (3 letters)
        icao: ICAO airport code (4 letters)
        airport: Full airport name
        latitude: Geographic latitude of the airport
        longitude: Geographic longitude of the airport
    """
    country_code: str
    region_name: str
    iata: str
    icao: str
    airport: str
    latitude: float
    longitude: float
