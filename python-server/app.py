from kafka import KafkaConsumer, KafkaProducer

server = "192.168.1.12:29092"

# Kafka consumer configuration
consumer_config = {
    "bootstrap_servers": server,
    "group_id": "my_consumer_group",
    "auto_offset_reset": "earliest",
}

# Kafka producer configuration
producer_config = {"bootstrap_servers": server}


def consume_message():
    consumer = KafkaConsumer("connection-status", **consumer_config)
    print("Waiting for messages...")

    for msg in consumer:
        data = msg.value.decode("utf-8")
        print(f"Received message: {data}")

        if data == "request":
            try:
                produce_message()
            except Exception as e:
                print(f"Producer error: {str(e)}")


def produce_message():
    producer = KafkaProducer(**producer_config)
    producer.send("connection-status", b"ok")
    producer.flush()


# main driver function
if __name__ == "__main__":
    consume_message()
