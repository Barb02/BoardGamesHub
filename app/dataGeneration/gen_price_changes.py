import requests
import random
import json
import time
from confluent_kafka import Producer

NUM_GAMES = 50
NUM_STORES = 4
DELAY = 10
MAX_CLICKS = 10
MIN_DISCOUNT = 10
MAX_DISCOUNT = 90

producer = Producer({'bootstrap.servers': 'kafka:29092'})
topic = 'bgh'
prices = {}

def check_game_endpoint():
    url = 'http://springboot:8080/api/v1/price/1/1'

    while(True):
        try:
            response = requests.get(url)
            break
        except requests.RequestException as e:
            print("Not Available")
        time.sleep(10)

def send_message(message):
    msg_json = json.dumps(message)
    producer.produce(topic, value=msg_json)
    print("Message sent",msg_json)

def send_price_message():
    message = {"type":"PRICE"}

    game_id = random.randint(1, NUM_GAMES)
    store_id = random.randint(1, NUM_STORES)

    r = requests.get("http://springboot:8080/api/v1/price/" + str(game_id) + "/" + str(store_id))
    if r.status_code != 200:
        return
    current_price = r.json()['price']

    key = (game_id, store_id)
    if key in prices.keys():
        if current_price == prices[key]:
            new_price = current_price - (current_price * (random.randint(MIN_DISCOUNT, MAX_DISCOUNT) / 100))
        else:
            new_price = prices[key]
    else:
        prices[key] = current_price
        new_price = current_price

    message['game_id'] = game_id
    message['store_id'] = store_id
    message['price'] = new_price
    send_message(message)

def send_click_message():
    message = {"type":"CLICK"}
    message['game_id'] = random.randint(1, NUM_GAMES)
    message['amount'] = random.randint(1, MAX_CLICKS)
    send_message(message)

def run():
    while True:
        send_price_message()
        send_click_message()
            
        time.sleep(DELAY)

def main():
    check_game_endpoint()
    run()

if __name__ == "__main__":
    main()



