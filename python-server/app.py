import json
import socket
import threading
import time

import paho.mqtt.client as mqtt
import pynmea2


# NMEA Client
def tcp_client(mqtt_client):
    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client.connect(("localhost", 10110))

    while True:
        try:
            response = client.recv(1024).decode()
            for line in response.split("\r\n"):
                if line.startswith("$"):
                    try:
                        mqtt_client.publish("gps/data", line, qos=1)
                    except pynmea2.ParseError as e:
                        print(f"Parse error: {e}")
                        continue
        except ConnectionResetError as e:
            print(f"Connection reset: {e}")
            # Sleep for a while before attempting to reconnect
            time.sleep(5)  # Adjust the delay as needed
            continue
        except Exception as e:
            print(f"An error occurred: {e}")
            break  # Exit the loop on other exceptions


# MQTT Callbacks
def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code: {rc}")
    client.subscribe("connection/status")
    if rc == 0:
        print("Connected successfully")
        client.publish("connection/status", "connected", qos=1, retain=True)
    if rc == 5:
        print("Authentication failed")


def on_message(client, userdata, msg):
    decoded_message = msg.payload.decode()
    print(f"Received message: {decoded_message}")

    try:
        decoded_message = json.loads(decoded_message)
        print(f"Received message: {decoded_message}")
    except json.JSONDecodeError:
        print(f"Received message is not valid JSON: {decoded_message}")


def main():
    # MQTT Client setup
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

    # Start NMEA client thread
    tcp_thread = threading.Thread(target=tcp_client, args=(client,))
    tcp_thread.start()

    # Start MQTT loop
    client.loop_forever()


if __name__ == "__main__":
    main()
