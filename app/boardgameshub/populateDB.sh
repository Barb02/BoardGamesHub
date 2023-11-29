#!/bin/bash

games_data=$(cat "src/main/resources/db/game_test.json")

echo "$games_data" | jq -c '.[]' | while IFS= read -r game_object; do
    curl -X POST \
         -H "Content-Type: application/json" \
         -d "$game_object" \
         "localhost:8080/api/v1/game/manual"
done

exit 

#prices_data=$(cat "src/main/resources/db/prices_test.json")
#counter=0
#gameid=0

#echo "$prices_data" | jq -c '.[]' | while IFS= read -r price_object; do
#    storeid=$((1 + counter % 4))
#    if [ "$storeid" -eq 1 ]; then
#        gameid=$((gameid + 1))
#    fi

#    curl -X POST \
#         -H "Content-Type: application/json" \
#         -d "$price_object" \
#         "localhost:8080/api/v1/price/$gameid"

#    counter=$((counter + 1))
#done


#changes_data=$(cat "src/main/resources/db/change_prices.json")
#counter=0
#gameid=0

#echo "$changes_data" | jq -c '.[]' | while IFS= read -r price_object; do
#    storeid=$((1 + counter % 4))
#    if [ "$storeid" -eq 1 ]; then
#        gameid=$((gameid + 1))
#    fi

#    curl -X POST \
#         -H "Content-Type: application/json" \
#         -d "$price_object" \
#         "localhost:8080/api/v1/price/$gameid"
#
#    counter=$((counter + 1))
#done
