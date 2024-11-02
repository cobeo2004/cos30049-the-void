from typing import List
from fastapi import APIRouter, Depends
from controller import FlightPricesController
from models import DestinationModel
from models.FlightPrice import FlightPriceModel
from utils.auth import get_current_user_id

router = APIRouter(
    prefix="/flight-prices",
    tags=["Flight Prices"],
    dependencies=[Depends(get_current_user_id)],
)


@router.get("/destinations", response_model=List[DestinationModel])
async def get_all_destinations(
    controller: FlightPricesController = Depends(FlightPricesController),
):
    destinations = controller.get_all_destinations()
    return destinations


@router.get("/destinations/search", response_model=List[DestinationModel])
async def get_destination(
    q: str, controller: FlightPricesController = Depends(FlightPricesController)
):
    destination = controller.get_destinations_by_region_name(q)
    return destination


@router.post("")
async def get_flight_prices(
    params: FlightPriceModel,
    controller: FlightPricesController = Depends(FlightPricesController),
):
    flight_prices = controller.get_flight_prices(params)
    return flight_prices
