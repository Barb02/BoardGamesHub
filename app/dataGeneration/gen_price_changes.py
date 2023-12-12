import requests
import random
import json
import time
from confluent_kafka import Producer

NUM_GAMES = 50
NUM_STORES = 4
DELAY = 10
MAX_CLICKS = 10

bootstrap_servers = 'kafka:29092'  # Replace with your Kafka broker's address
producer = Producer({'bootstrap.servers': bootstrap_servers})
topic = 'bgh'

changes = [0.95, 1.005, 0.9, 1.1, 0.8, 1.2, 0.7, 1.3, 0.6, 1.4, 0.5, 1.5, 0.4, 1.6, 0.3, 1.7, 0.2, 1.8]
prob_weights = [50, 50, 30, 30, 30, 30, 20, 20, 20, 20, 5, 5, 5, 5, 1, 1, 1, 1]

def check_game_endpoint():
    url = 'http://springboot:8080/api/v1/price/1/1'

    while(True):
        try:
            response = requests.get(url)
            break
        except requests.RequestException as e:
            print("Not Available")
        time.sleep(10)

# Produce asynchronously
def delivery_report(err, msg):
    if err is not None:
        print(f'Message delivery failed: {err}')
    else:
        print(f'Message delivered to {msg.topic()} [{msg.partition()}]')

def run():
    while True:
        for message_type in ["PRICE", "CLICK"]:
            message = {}
            message['type'] = message_type
            if message_type == "PRICE":
                game_id = 1
                store_id = random.randint(1, NUM_STORES)
                r = requests.get("http://springboot:8080/api/v1/price/" + str(game_id) + "/" + str(store_id))
                if r.status_code == 200:
                    change = random.choices(changes, weights=prob_weights, k=1)[0]
                    new_price = r.json()['price'] * change
                    message['game_id'] = game_id
                    message['store_id'] = store_id
                    message['price'] = new_price

            elif message_type == "CLICK":
                message['game_id'] = random.randint(1, NUM_GAMES)
                message['amount'] = random.randint(1, MAX_CLICKS)

            msg_json = json.dumps(message)
            producer.produce(topic, value=msg_json, callback=delivery_report)
            print("Message sent",msg_json)
        time.sleep(DELAY)

def main():
    check_game_endpoint()
    run()

if __name__ == "__main__":
    main()



