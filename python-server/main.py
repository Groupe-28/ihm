from flask import Flask, render_template
from kafka import KafkaProducer

app = Flask(__name__)
producer = KafkaProducer(bootstrap_servers="kafka:9092")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/send-message", methods=["POST"])
def send_message():
    message = "Hello, Kafka!"  # Modify the message content as needed
    producer.send("my-topic", value=message.encode())
    return "Message sent to Kafka!"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8150)
