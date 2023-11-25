#!/bin/bash

json_data=$(cat "board_games.json")

echo "$json_data" | jq -c '.[]' | while IFS= read -r json_object; do
    curl -X POST \
         -H "Content-Type: application/json" \
         -d "$json_object" \
         "localhost:8080/game/manual"
done

