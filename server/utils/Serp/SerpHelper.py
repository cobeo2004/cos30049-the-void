"""
- File: SerpHelper.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Helper class for interacting with SerpAPI for flight price data
"""

from serpapi.google_search import GoogleSearch
from utils.dotEnv import env
from models import FlightPriceModel

class SerpHelper:
    """
    Helper class for making requests to SerpAPI's Google Flights interface

    Handles:
    - Parameter formatting for API requests
    - One-way and return flight searches
    - Error handling for API responses
    """

    def __init__(self) -> None:
        """Initialize with empty parameters dictionary"""
        self.params = {}

    def get_flight_prices(self, params: FlightPriceModel) -> dict:
        """
        Get flight prices from Google Flights via SerpAPI

        Args:
            params: Flight search parameters including dates, locations, passengers

        Returns:
            dict: Flight price data and search results

        Raises:
            Exception: If SerpAPI returns an error
        """
        if params.return_date is None:
            # One-way flight search
            self.params = {
                "engine": "google_flights",
                "type": 2,
                **params.model_dump(exclude={"return_date"}),
                "adults": int(params.adults),
                "children": int(params.children),
                "infants_on_lap": int(params.infants_on_lap),
                "hl": "en",
                "api_key": env.SERP_API_KEY,
            }
        else:
            # Return flight search
            self.params = {
                "engine": "google_flights",
                type: 1,
                **params.model_dump(),
                "adults": int(params.adults),
                "children": int(params.children),
                "infants_on_lap": int(params.infants_on_lap),
                "hl": "en",
                "api_key": env.SERP_API_KEY,
            }

        # Make API request
        search = GoogleSearch(self.params)
        results = search.get_dict()

        # Handle API errors
        if results.get("error"):
            raise Exception(results.get("error"))
        return results
