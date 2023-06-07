

# IHM

This is a Dockerized full-stack application with a PostgreSQL database, a backend developed using NestJS (replace with your backend technology if different), a frontend developed using React (replace with your frontend technology if different), a Python microservice and an MQTT broker (Eclipse Mosquitto).

## Services

This application consists of several services:

- **db**: This service runs a PostgreSQL 15.2 database. Data is persisted in a Docker volume.

- **backend**: This service is a backend application built with NestJS. It communicates with the `db` service for data persistence.

- **frontend**: This service serves the frontend of the application. It communicates with the `backend` service to retrieve and send data.

- **robot**: This service is a Python application that serves as a separate microservice in the application. It can communicate with other services within the network.

- **mosquitto**: This service is an MQTT broker that enables publish/subscribe messaging in a lightweight manner.

## How to Run

Before you start, ensure you have Docker and Docker Compose installed on your machine.

1. Clone the repository and navigate to the root directory.

2. Configure your environment variables. You will need to provide configuration for the database, backend, frontend, and MQTT broker. These are located in the `.env`, `backend/docker.env`, `frontend/docker.env`, and `mosquitto/config/mosquitto.conf` files, respectively.

3. Build and start the containers using Docker Compose:

    ```bash
    docker compose -f docker-compose.prod.yaml up --build -d    
    ```

    or for dev

     ```bash
    docker compose -f docker-compose.dev.yaml up --build -d    
    ```

    This command will start all services in the background and leave them running.

4. To check the status of your services, run:

    ```bash
    docker-compose ps
    ```

5. To stop the services, run:

    ```bash
    docker-compose down
    ```

## Accessing the Application

After starting the services, you can access:

- The frontend at `http://localhost:3000`
- The backend at `http://localhost:8000`
- The robot service at `http://localhost:8150`
- The Mosquitto MQTT broker at `mqtt://localhost:1883`

Please replace `localhost` with the appropriate host name if you're not running the application locally.


Of course, please replace any assumptions I made with the actual technologies you're using. And if your application requires any additional setup steps, include those in the "How to Run" section.