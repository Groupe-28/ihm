import json
import time

import paho.mqtt.client as mqtt


# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg: mqtt.MQTTMessage):
    decoded_message = msg.payload.decode()
    print(f"Received message: {decoded_message}")

    try:
        decoded_message = json.loads(decoded_message)
        print(f"Received message: {decoded_message}")

        if msg.topic == "connection/status" and decoded_message.get("data") == "request":
            client.publish("connection/status", "ok")
    except json.JSONDecodeError:
        print(f"Received message is not valid JSON: {decoded_message}")


client = mqtt.Client()
client.on_message = on_message

client.connect("localhost", 1883, 60)

# Subscribing in on_connect() means that if we lose the connection and
# reconnect then subscriptions will be renewed.
client.subscribe("connection/status")

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
client.loop_start()

while True:
    time.sleep(1)  # Delay for 1 second
