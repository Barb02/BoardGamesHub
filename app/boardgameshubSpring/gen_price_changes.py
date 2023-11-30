import requests
import random
import json

NUM_GAMES = 30
NUM_STORES = 4

changes = [0.1, 1.1, 0.2, 1.2, 0.3, 1.3, 0.4, 1.4, 0.5, 1.5, 0.6, 1.6, 0.7, 1.7, 0.8, 1.8, 0.9, 1.9]
prob_weights = [20, 20, 10, 10, 10, 10, 5, 5, 5, 5, 2, 2, 2, 2, 1, 1, 1, 1]
message = {}

while True:
    game_id = random.randint(1, NUM_GAMES)
    store_id = random.randint(1, NUM_STORES)
    r = requests.get("localhost:8080/api/v1/price/" + game_id + "/" + store_id)
    if r.status_code == 200:
        change = random.choice(changes, p=prob_weights, k=1)
        new_price = r.json()['price'] * change
        message['game_id'] = game_id
        message['store_id'] = store_id
        message['price'] = new_price
        msg_json = json.dumps(message)



