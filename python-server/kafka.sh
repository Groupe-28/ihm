docker network create kafka-network

docker run -d \
  --name zookeeper \
  --network kafka-network \
  -p 2181:2181 \
  -e ZOOKEEPER_CLIENT_PORT=2181 \
  confluentinc/cp-zookeeper:latest


docker run -d \
  --name kafka \
  --network kafka-network \
  -p 9092:9092 \
  -p 29093:29093 \
  -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
  -e KAFKA_LISTERNERS=INTERNAL://kafka:9092,EXTERNAL://:29093 \
  -e KAFKA_ADVERTISED_LISTENERS=INTERNAL://kafka:9092,EXTERNAL://192.168.1.12:29093 \
  -e KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=INTERNAL:PLAINTEXT,EXTERNAL:PLAINTEXT \
  -e KAFKA_INTER_BROKER_LISTENER_NAME=INTERNAL \
  -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
  confluentinc/cp-kafka:latest