from typing import List
from fastapi import APIRouter
from bs4 import BeautifulSoup
from pydantic import BaseModel
import requests
from controller import FlightPricesModel
from models import DestinationModel

router = APIRouter(prefix="/craweler", tags=["Craweler"])

class TripModel(BaseModel):
    from_location: str
    to_location: str
    start_date: str
    end_date: str

@router.get("/top-100")
async def top_100():
    moz_headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36"
    }
    url = "https://www.billboard.com/charts/hot-100/"
    response = requests.get(url, headers=moz_headers)
    soup = BeautifulSoup(response.text, "html.parser")
    songs = soup.select(
        "#post-1479786 > div.pmc-paywall > div > div > div > div.chart-results-list.\/\/.lrv-u-padding-t-150.lrv-u-padding-t-050\@mobile-max > div > ul > li.lrv-u-width-100p"
    )
    img = soup.select_one(
        "#post-1479786 > div.pmc-paywall > div > div > div > div.chart-results-list.\/\/.lrv-u-padding-t-150.lrv-u-padding-t-050\@mobile-max > div > ul > li.o-chart-results-list__item.\/\/.u-width-200.u-width-100\@tablet-only.u-width-67\@mobile-max.lrv-u-border-b-1.u-border-b-0\@mobile-max.lrv-u-border-color-grey.u-flex-order-n1\@mobile-max > div > div > img.c-lazy-image__img"
    )
    songs = [
        {
            "rank": rank + 1,
            "image": img.get("src"),
            "title": song.select_one("#title-of-a-story").text.strip(),
            "artist": song.select_one("span.c-label").text.strip(),
        }
        for rank, song in enumerate(songs)
    ]
    return songs

@router.get("/trip")
async def trip(model: TripModel):
    url = f"https://www.expedia.ie/Flights-Search?trip=oneway&leg1=from:{model.from_location},to:{model.to_location},departure:{model.start_date}TANYT&passengers=adults:1,children:0,seniors:0,infantinlap:Y&options=cabinclass:economy&mode=search&origref=www.expedia.ie"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    print(soup)
    return {"status": "success"}

@router.get("/destinations", response_model=List[DestinationModel])
async def get_all_destinations():
    model = FlightPricesModel()
    destinations = model.get_all_destinations()
    return destinations
