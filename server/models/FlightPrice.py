"""
- File: FlightPrice.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Defines the data model for flight price search parameters
"""

from typing import Literal, Optional, List, Any
from pydantic import BaseModel
from typing_extensions import Annotated, Doc


class FlightPriceRequestModel(BaseModel):
    """
    Data model for flight price request search parameters.

    Attributes:
        trip_type: Type of trip (round-trip or one-way).
        departure_id: ID of departure location.
        arrival_id: ID of arrival location.
        outbound_date: Date of outbound flight.
        return_date: Date of return flight (optional).
        currency: Currency for price display.
        adults: Number of adult passengers.
        children: Number of child passengers.
        infants_on_lap: Number of lap infant passengers.
    """
    trip_type: Annotated[Literal["round", "oneway"], Doc("""Type of trip (round-trip or one-way)""")]
    departure_id: Annotated[str, Doc("""ID of departure location""")]
    arrival_id: Annotated[str, Doc("""ID of arrival location""")]
    outbound_date: Annotated[str, Doc("""Date of outbound flight""")]
    return_date: Annotated[Optional[str], Doc("""Date of return flight""")] = None
    currency: Annotated[Literal["USD", "AUD", "EUR"], Doc("""Currency for price display""")]
    adults: Annotated[str, Doc("""Number of adult passengers""")]
    children: Annotated[str, Doc("""Number of child passengers""")]
    infants_on_lap: Annotated[str, Doc("""Number of lap infant passengers""")]

class FlightPriceSearchMetadata(BaseModel):
    """
    Metadata for flight price search results.

    Attributes:
        id: ID of the flight price search.
        status: Status of the search.
        json_endpoint: Endpoint for JSON response.
        created_at: Timestamp of search creation.
        processed_at: Timestamp of search processing.
        google_flights_url: URL for Google Flights search.
        raw_html_file: Path to raw HTML file.
        prettify_html_file: Path to prettified HTML file.
        total_time_taken: Total time taken for search.
    """
    id: Annotated[str, Doc("""ID of the flight price search""")]
    status: Annotated[str, Doc("""Status of the search""")]
    json_endpoint: Annotated[str, Doc("""Endpoint for JSON response""")]
    created_at: Annotated[str, Doc("""Timestamp of search creation""")]
    processed_at: Annotated[str, Doc("""Timestamp of search processing""")]
    google_flights_url: Annotated[str, Doc("""URL for Google Flights search""")]
    raw_html_file: Annotated[str, Doc("""Path to raw HTML file""")]
    prettify_html_file: Annotated[str, Doc("""Path to prettified HTML file""")]
    total_time_taken: Annotated[float, Doc("""Total time taken for search""")]

class FlightPriceSearchParameters(BaseModel):
    """
    Parameters for flight price search.

    Attributes:
        departure_id: ID of departure location.
        arrival_id: ID of arrival location.
        outbound_date: Date of outbound flight.
        return_date: Date of return flight (optional).
        currency: Currency for price display.
        adults: Number of adult passengers.
        children: Number of child passengers.
        infants_on_lap: Number of lap infant passengers.
    """
    departure_id: Annotated[str, Doc("""ID of departure location""")]
    arrival_id: Annotated[str, Doc("""ID of arrival location""")]
    outbound_date: Annotated[str, Doc("""Date of outbound flight""")]
    return_date: Annotated[Optional[str], Doc("""Date of return flight""")] = None
    currency: Annotated[Literal["USD", "AUD", "EUR"], Doc("""Currency for price display""")]
    adults: Annotated[int, Doc("""Number of adult passengers""")]
    children: Annotated[int, Doc("""Number of child passengers""")]
    infants_on_lap: Annotated[int, Doc("""Number of lap infant passengers""")]

class FlightPriceFlightAirport(BaseModel):
    """
    Information about a flight airport.

    Attributes:
        name: Name of the airport.
        id: IATA code of the airport.
        time: Time of the flight.
    """
    name: Annotated[str, Doc("""Name of the airport""")]
    id: Annotated[str, Doc("""IATA code of the airport""")]
    time: Annotated[str, Doc("""Time of the flight""")]


class FlightPriceFlightInformations(BaseModel):
    """
    Information about flight details.

    Attributes:
        departure_airport: Departure airport information.
        arrival_airport: Arrival airport information.
        airline: Name of the airline.
        airplane: Name of the airplane.
        duration: Duration of the flight in minutes.
        airline_logo: URL of the airline logo.
        travel_class: Travel class of the flight.
        flight_number: Flight number.
        legroom: Legroom of the flight.
        extensions: Additional flight information.
        often_delayed_by_over_30_min: Flag for delayed flights.
    """
    departure_airport: Annotated[FlightPriceFlightAirport, Doc("""Departure airport information""")]
    arrival_airport: Annotated[FlightPriceFlightAirport, Doc("""Arrival airport information""")]
    airline: Annotated[str, Doc("""Name of the airline""")]
    airplane: Annotated[str, Doc("""Name of the airplane""")]
    duration: Annotated[int, Doc("""Duration of the flight in minutes""")]
    airline_logo: Annotated[str, Doc("""URL of the airline logo""")]
    travel_class: Annotated[str, Doc("""Travel class of the flight""")]
    flight_number: Annotated[str, Doc("""Flight number""")]
    legroom: Annotated[str, Doc("""Legroom of the flight""")]
    extensions: Annotated[List[str], Doc("""Additional flight information""")]
    often_delayed_by_over_30_min: Annotated[Optional[bool], Doc("""Flag for delayed flights""")] = None


class FlightPriceCarbonEmissions(BaseModel):
    """
    Information about carbon emissions for a flight.

    Attributes:
        this_flight: Carbon emissions for this flight in grams.
        typical_for_this_route: Typical carbon emissions for this route in grams.
        difference_percent: Difference in carbon emissions percentage.
    """
    this_flight: Annotated[int, Doc("""Carbon emissions for this flight in grams""")]
    typical_for_this_route: Annotated[int, Doc("""Typical carbon emissions for this route in grams""")]
    difference_percent: Annotated[int, Doc("""Difference in carbon emissions percentage""")]


class FlightPriceBestFlights(BaseModel):
    """
    Information about the best flights.

    Attributes:
        flights: List of best flights.
        total_duration: Total duration of the flights in minutes.
        carbon_emissions: Carbon emissions information.
        price: Total price of the flights in currency units.
        airline_logo: URL of the airline logo.
        extensions: Additional flight information.
        departure_token: Departure token.
    """
    flights: Annotated[List[FlightPriceFlightInformations], Doc("""List of best flights""")]
    total_duration: Annotated[int, Doc("""Total duration of the flights in minutes""")]
    carbon_emissions: Annotated[FlightPriceCarbonEmissions, Doc("""Carbon emissions information""")]
    price: Annotated[int, Doc("""Total price of the flights in currency units""")]
    airline_logo: Annotated[str, Doc("""URL of the airline logo""")]
    extensions: Annotated[List[str], Doc("""Additional flight information""")]
    departure_token: Annotated[str, Doc("""Departure token""")]


class FlightPriceAirportDetail(BaseModel):
    """
    Details about an airport.

    Attributes:
        id: IATA code of the airport.
        name: Name of the airport.
    """
    id: Annotated[str, Doc("""IATA code of the airport""")]
    name: Annotated[str, Doc("""Name of the airport""")]


class FlightPriceAirports(BaseModel):
    """
    Information about an airport.

    Attributes:
        airport: Airport information.
        city: City of the airport.
        country: Country of the airport.
        country_code: Country code of the airport.
        image: URL of the airport image.
        thumbnail: URL of the airport thumbnail.
    """
    airport: Annotated[FlightPriceAirportDetail, Doc("""Airport information""")]
    city: Annotated[str, Doc("""City of the airport""")]
    country: Annotated[str, Doc("""Country of the airport""")]
    country_code: Annotated[str, Doc("""Country code of the airport""")]
    image: Annotated[str, Doc("""URL of the airport image""")]
    thumbnail: Annotated[str, Doc("""URL of the airport thumbnail""")]


class FlightPriceFromToAirportDetail(BaseModel):
    """
    Details about departure and arrival airports.

    Attributes:
        departure: Departure airport information.
        arrival: Arrival airport information.
    """
    departure: Annotated[List[FlightPriceAirports], Doc("""Departure airport information""")]
    arrival: Annotated[List[FlightPriceAirports], Doc("""Arrival airport information""")]


class FlightPriceResponseModel(BaseModel):
    """
    Response model for flight price search results.

    Attributes:
        search_metadata: Search metadata.
        search_parameters: Search parameters.
        best_flights: Best flights information.
        other_flights: Other flights information (optional).
        airports: Airport information.
        price_insights: Price insights.
    """
    search_metadata: Annotated[FlightPriceSearchMetadata, Doc("""Search metadata""")]
    search_parameters: Annotated[FlightPriceSearchParameters, Doc("""Search parameters""")]
    best_flights: Annotated[List[FlightPriceBestFlights], Doc("""Best flights information""")]
    other_flights: Annotated[Optional[List[FlightPriceBestFlights]], Doc("""Other flights information""")] = None
    airports: Annotated[List[FlightPriceFromToAirportDetail], Doc("""Airport information""")]
    price_insights: Annotated[Any, Doc("""Price insights""")]

