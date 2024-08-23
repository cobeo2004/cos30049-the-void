# Civil Aviation app Kafka Streaming

## Introduction

This project was bootstrapped with [`Apache Kafka`](https://kafka.apache.org), [`Apache Zookeeper`](https://zookeeper.apache.org) and [`Docker`](https://www.docker.com).

## Get Started

### Setting up `Docker` with `Apache Kafka` and `Apache Zookeeper`

- Install [`Docker`](https://docs.docker.com/engine/install/) and [`docker-compose`](https://docs.docker.com/compose/install/)

- For using `Apache Kafka`, `Apache Zookeeper` with `docker-compose`, simply running the following command:

  ```sh
  # Change the directory to the server folder
  cd server
  # Run the pre-configured docker-compose.yml
  docker-compose -d up -f docker-compose.yml
  ```

- However, you can configure your own `docker-compose` with the following template:

  ```yml
    version: '2'
    services:
    zookeeper:
        image: confluentinc/cp-zookeeper:7.7.0
        hostname: zookeeper
        container_name: zookeeper
        ports:
        - "2181:2181"
        environment:
        ZOOKEEPER_CLIENT_PORT: 2181
        ZOOKEEPER_TICK_TIME: 2000

    broker:
        image: confluentinc/cp-server:7.7.0
        hostname: broker
        container_name: broker
        depends_on:
        - zookeeper
        ports:
        - "9092:9092"
        - "9101:9101"
        environment:
        KAFKA_BROKER_ID: 1
        KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181'
        KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
        KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://broker:29092,PLAINTEXT_HOST://localhost:9092
        KAFKA_METRIC_REPORTERS: io.confluent.metrics.reporter.ConfluentMetricsReporter
        KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
        KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
        KAFKA_CONFLUENT_LICENSE_TOPIC_REPLICATION_FACTOR: 1
        KAFKA_CONFLUENT_BALANCER_TOPIC_REPLICATION_FACTOR: 1
        KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
        KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
        KAFKA_JMX_PORT: 9101
        KAFKA_JMX_HOSTNAME: localhost
        CONFLUENT_METRICS_REPORTER_BOOTSTRAP_SERVERS: broker:29092
        CONFLUENT_METRICS_REPORTER_TOPIC_REPLICAS: 1
        CONFLUENT_METRICS_ENABLE: 'true'
        CONFLUENT_SUPPORT_CUSTOMER_ID: 'anonymous'

    control-center:
        image: confluentinc/cp-enterprise-control-center:7.7.0
        hostname: control-center
        container_name: control-center
        depends_on:
        - broker
        ports:
        - "9021:9021"
        environment:
        CONTROL_CENTER_BOOTSTRAP_SERVERS: 'broker:29092'
        CONTROL_CENTER_REPLICATION_FACTOR: 1
        CONTROL_CENTER_INTERNAL_TOPICS_PARTITIONS: 1
        CONTROL_CENTER_MONITORING_INTERCEPTOR_TOPIC_PARTITIONS: 1
        CONFLUENT_METRICS_TOPIC_REPLICATION: 1
        PORT: 9021

  ```

### Using `Apache Kafka` with `Python`

- Install `quixstreams` and `requests` using `pip`:

  ```sh
  pip install -U quixstreans requests
  ```

- Usage:
    - Simple `Kafka Consumer`:

    ```py
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

    ```

    - Simple `Kafka Producer`:
    ```py
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


    ```

## Questions and Conclusions

Should you have any further questions, FEAT or bugs, don't hesitate to raise on the `issues` section.

Best regards,

The Void
