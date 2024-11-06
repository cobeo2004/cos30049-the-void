"""
- File: FlightPricesController.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Controller handling flight price and destination data operations
"""

from utils.CSVs import ICAOReader, AirplaneCarrierReader
from models import DestinationModel, FlightPriceRequestModel, FlightPriceResponseModel
from utils.Serp import SerpHelper
from fastapi import HTTPException

class FlightPricesController:
    """
    Controller class handling flight price and destination operations

    Handles:
    - Destination data retrieval and search
    - Flight price lookups
    - Airline information retrieval
    """

    def __init__(self):
        """Initialize with required data readers and API helper"""
        self.reader = ICAOReader()
        self.airlineCarriers = AirplaneCarrierReader()
        self.serp = SerpHelper()

    def get_all_destinations(self):
        """
        Get list of all available destinations

        Returns:
            list[DestinationModel]: List of all destinations with their details
        """
        df = self.reader.get_iata_icao_df()
        destinations = []
        for index, row in df.iterrows():
            destinations.append(DestinationModel(
                country_code=row["country_code"],
                region_name=row["region_name"],
                iata=row["iata"],
                icao=row["icao"],
                airport=row["airport"],
                latitude=float(row["latitude"]),
                longitude=float(row["longitude"])
            ))
        return destinations

    def get_destinations_by_region_name(self, region_name: str):
        """
        Search destinations by region name

        Args:
            region_name: Search query string

        Returns:
            list[DestinationModel]: List of matching destinations
        """
        df = self.reader.get_iata_icao_df()
        res = df[df["region_name"].str.contains(region_name, case=False)]
        destinations = []
        for index, row in res.iterrows():
            destinations.append(DestinationModel(
                country_code=row["country_code"],
                region_name=row["region_name"],
                iata=row["iata"],
                icao=row["icao"],
                airport=row["airport"],
                latitude=float(row["latitude"]),
                longitude=float(row["longitude"])
            ))
        return destinations

    def get_flight_prices(self, params: FlightPriceRequestModel) -> FlightPriceResponseModel:
        """
        Get flight prices from SerpAPI

        Args:
            params: Flight search parameters

        Returns:
            FlightPriceResponseModel: Flight price data and search results

        Raises:
            HTTPException: If API request fails
        """
        try:
            return self.serp.get_flight_prices(params)
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    def get_all_airlines(self):
        """
        Get list of all available airlines

        Returns:
            list[str]: List of airline names
        """
        df = self.airlineCarriers.get_airlines()
        airlines = []
        for index, row in df.iterrows():
            airlines.append(row["airlines"])
        return airlines
