"""
- File: flight_prices.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Router handling flight price and destination information endpoints
"""

from typing import List
from fastapi import APIRouter, Depends
from controller import FlightPricesController
from models import DestinationModel
from models.FlightPrice import FlightPriceModel
from utils.auth import get_current_user_id

# Initialize router with authentication requirement
router = APIRouter(
    prefix="/flight-prices",
    tags=["Flight Prices"],
    dependencies=[Depends(get_current_user_id)],
)


@router.get("/destinations", response_model=List[DestinationModel])
async def get_all_destinations(
    controller: FlightPricesController = Depends(FlightPricesController),
):
    """
    Get list of all available destinations

    Args:
        controller: Flight prices controller instance

    Returns:
        List[DestinationModel]: List of all destinations with their details
    """
    destinations = controller.get_all_destinations()
    return destinations


@router.get("/destinations/search", response_model=List[DestinationModel])
async def get_destination(
    q: str, controller: FlightPricesController = Depends(FlightPricesController)
):
    """
    Search destinations by region name

    Args:
        q: Search query string
        controller: Flight prices controller instance

    Returns:
        List[DestinationModel]: List of matching destinations
    """
    destination = controller.get_destinations_by_region_name(q)
    return destination


@router.post("")
async def get_flight_prices(
    params: FlightPriceModel,
    controller: FlightPricesController = Depends(FlightPricesController),
):
    """
    Get flight prices for given parameters

    Args:
        params: Flight search parameters
        controller: Flight prices controller instance

    Returns:
        dict: Flight price information
    """
    flight_prices = controller.get_flight_prices(params)
    return flight_prices


@router.get("/airlines", response_model=List[str])
async def get_all_airlines(
    controller: FlightPricesController = Depends(FlightPricesController),
):
    """
    Get list of all available airlines

    Args:
        controller: Flight prices controller instance

    Returns:
        List[str]: List of airline names
    """
    airlines = controller.get_all_airlines()
    return airlines
