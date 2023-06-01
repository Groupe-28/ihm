from confluent_kafka import Consumer, Producer

# main driver function
if __name__ == "__main__":
    producer = Producer(
        {
            "bootstrap.servers": "kafka:9092",
        }
    )

    consumer = Consumer(
        {
            "bootstrap.servers": "kafka:9092",
            "group.id": "python-consumer",
            "auto.offset.reset": "earliest",
        }
    )

    print("Kafka Consumer has been initiated...")
    print("Available topics to consume: ", consumer.list_topics().topics)

    consumer.subscribe(topics=["connection-status"])

    while True:
        msg = consumer.poll(1.0)  # timeout

        if msg is None or msg == {}:
            continue

        if msg.error():
            print(f"Consumer error: {msg.error()}")
            continue

        data = msg.value().decode("utf-8")

        if data == "request":
            try:
                print(data)
                print("Sending response...")
                producer.produce("connection-status", "ok".encode("utf-8"))
                producer.flush()

            except Exception as e:
                print(f"Producer error: {str(e)}")

    consumer.close()
