from utils.CSVs import ICAOReader, AirplaneCarrierReader
from models import DestinationModel, FlightPriceModel
from utils.Serp import SerpHelper
class FlightPricesController:
    def __init__(self):
        self.reader = ICAOReader()
        self.airlineCarriers = AirplaneCarrierReader()
        self.serp = SerpHelper()

    def get_all_destinations(self):
        df = self.reader.get_iata_icao_df()
        destinations = []
        for index, row in df.iterrows():
            destinations.append(DestinationModel(country_code=row["country_code"], region_name=row["region_name"], iata=row["iata"], icao=row["icao"], airport=row["airport"], latitude=float(row["latitude"]), longitude=float(row["longitude"])))
        return destinations

    def get_destinations_by_region_name(self, region_name: str):
        df = self.reader.get_iata_icao_df()
        res = df[df["region_name"].str.contains(region_name, case=False)]
        destinations = []
        for index, row in res.iterrows():
            destinations.append(DestinationModel(country_code=row["country_code"], region_name=row["region_name"], iata=row["iata"], icao=row["icao"], airport=row["airport"], latitude=float(row["latitude"]), longitude=float(row["longitude"])))
        return destinations

    def get_flight_prices(self, params: FlightPriceModel) -> dict:
        print(params.model_dump())
        return self.serp.get_flight_prices(params)

    def get_all_airlines(self):
        df = self.airlineCarriers.get_airlines()
        airlines = []
        for index, row in df.iterrows():
            airlines.append(row["airlines"])
        return airlines
