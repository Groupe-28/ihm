import json

from flask import Flask, render_template
from kafka import KafkaProducer

app = Flask(__name__)
producer = KafkaProducer(bootstrap_servers="kafka:9092")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/send-message", methods=["POST"])
def send_message():
    message = {
        "title": "Hello from Python!",
        "content": {
            "message": "This message was sent from Python!",
            "author": "Python",
        },
    }
    producer.send("logs", value=json.dumps(message).encode("utf-8"))
    return "Message sent to Kafka!"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8150)
