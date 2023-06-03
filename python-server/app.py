from confluent_kafka import Consumer, Producer

# server = "localhost:29092" # local
server = "kafka:9092"

# Kafka consumer configuration
consumer_config = {
    "bootstrap.servers": server,
    "group.id": "my_consumer_group",
    "auto.offset.reset": "earliest",
}

# Kafka producer configuration
producer_config = {"bootstrap.servers": server}


def consume_message():
    consumer = Consumer(consumer_config)
    consumer.subscribe(["connection-status"])

    print("Waiting for messages...")

    while True:
        msg = consumer.poll(1.0)  # timeout

        if msg is None or msg == {}:
            continue

        if msg.error():
            print(f"Consumer error: {msg.error()}")
            continue

        print(f"Received message: {msg}")

        data = msg.value().decode("utf-8")

        if data == "request":
            try:
                produce_message()
            except Exception as e:
                print(f"Producer error: {str(e)}")

    consumer.close()


def produce_message():
    try:
        producer = Producer(producer_config)
        producer.produce("connection-status", "ok".encode("utf-8"))
        producer.flush()
    except Exception as e:
        print(f"Producer error: {str(e)}")


# main driver function
if __name__ == "__main__":
    consume_message()
