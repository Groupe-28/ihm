import json

import paho.mqtt.client as mqtt


# The callback for when the client successfully connects to the server.
def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code: {rc}")
    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe("connection/status")
    if rc == 0:
        print("Connected successfully")
        client.publish("connection/status", "connected", qos=1, retain=True)

    if rc == 5:
        print("Authentication failed")


# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    decoded_message = msg.payload.decode()
    print(f"Received message: {decoded_message}")

    try:
        decoded_message = json.loads(decoded_message)
        print(f"Received message: {decoded_message}")

    except json.JSONDecodeError:
        print(f"Received message is not valid JSON: {decoded_message}")


broker = "localhost"
port = 1883
lwt_topic = "connection/status"
lwt_message = "disconnected"

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

# Configure LWT
client.will_set(lwt_topic, lwt_message, qos=1, retain=True)

# Connect to broker with username and password
client.username_pw_set("console", "console")

client.connect(broker, port, 60)

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
client.loop_forever()
