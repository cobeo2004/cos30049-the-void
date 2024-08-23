from quixstreams import Application
import json


def main():
    app = Application(
        broker_address="localhost:9092",
        loglevel="DEBUG",
        consumer_group="weather_consumer_group",
        # Earliest: Read from beginning offset, Latest: Read from latest offset
        auto_offset_reset="latest",
    )
    with app.get_consumer() as consumer:
        consumer.subscribe(["weather_topic"])
        while True:
            msg = consumer.poll(1)
            if msg is None:
                print("Waiting for message...")
            elif msg.error() is not None:
                raise Exception(msg.error())
            else:
                key = msg.key().decode("utf-8")
                value = json.loads(msg.value())
                offset = msg.offset()
                print(f"Received message: {key}, {value}, {offset}")
                consumer.store_offsets(msg)


if __name__ == "__main__":
    main()
