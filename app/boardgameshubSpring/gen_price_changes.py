import requests
import random
import json
import time

NUM_GAMES = 2
NUM_STORES = 4
DELAY = 0.5 * 60

changes = [0.95, 1.005, 0.9, 1.1, 0.8, 1.2, 0.7, 1.3, 0.6, 1.4, 0.5, 1.5, 0.4, 1.6, 0.3, 1.7, 0.2, 1.8]
prob_weights = [50, 50, 30, 30, 30, 30, 20, 20, 20, 20, 5, 5, 5, 5, 1, 1, 1, 1]
message = {}

while True:
    game_id = random.randint(1, NUM_GAMES)
    store_id = random.randint(1, NUM_STORES)
    r = requests.get("http://localhost:8080/api/v1/price/" + str(game_id) + "/" + str(store_id))
    if r.status_code == 200:
        change = random.choices(changes, weights=prob_weights, k=1)[0]
        print("Curr price:" + str(r.json()['price']))
        new_price = r.json()['price'] * change
        print("Change:" + str(change))
        print("New price:" + str(new_price))
        message['game_id'] = game_id
        message['store_id'] = store_id
        message['price'] = new_price
        msg_json = json.dumps(message)
        print(msg_json)
    time.sleep(DELAY)



