from pydantic import BaseModel


class DestinationModel(BaseModel):
    country_code: str
    region_name: str
    iata: str
    icao: str
    airport: str
    latitude: float
    longitude: float
