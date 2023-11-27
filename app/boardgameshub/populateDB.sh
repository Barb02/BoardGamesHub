#!/bin/bash

#json_data=$(cat "src/main/resources/db/board_games.json")

#json_data=$(cat "game.json")

#echo "$json_data" | jq -c '.[]' | while IFS= read -r json_object; do
#    curl -X POST \
#         -H "Content-Type: application/json" \
#         -d "$json_object" \
#         "localhost:8080/game/manual"
#done

json_data=$(cat "price.json")

echo "$json_data" | jq -c '.[]' | while IFS= read -r json_object; do
    curl -X PUT \
         -H "Content-Type: application/json" \
         -d "$json_object" \
         "localhost:8080/price/1"
done

