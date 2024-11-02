from serpapi.google_search import GoogleSearch
from utils.dotEnv import env
from models import FlightPriceModel


class SerpHelper:
    def __init__(self) -> None:
        self.params = {}

    def get_flight_prices(self, params: FlightPriceModel) -> dict:
        if params.return_date is None:
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
        search = GoogleSearch(self.params)
        results = search.get_dict()
        if results.get("error"):
            raise Exception(results.get("error"))
        return results
