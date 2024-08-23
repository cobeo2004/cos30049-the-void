import requests
import json
from quixstreams import Application
import time


def request_weather():

    res = requests.get(
        "https://api.open-meteo.com/v1/forecast",
        params={
            "latitude": 51.5,
            "longitude": -0.11,
            "current": "temperature_2m"
        }
    )

    return res.json()


def main():
    app = Application(
        broker_address="localhost:9092",
        loglevel="DEBUG"
    )

    with app.get_producer() as prod:
        while True:
            weather = request_weather()
            print("Got weather data: %s", weather)
            prod.produce(
                topic="weather_topic",
                key="London",
                value=json.dumps(weather)
            )
            print("Produced. Sleeping...")
            time.sleep(1)


if __name__ == "__main__":
    main()
