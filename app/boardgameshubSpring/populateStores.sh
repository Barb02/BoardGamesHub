#!/bin/bash

data=$(cat "src/main/resources/db/stores.json")

echo "$data" | jq -c '.[]' | while IFS= read -r object; do
    curl -X POST \
         -H "Content-Type: application/json" \
         -d "$object" \
         "localhost:8080/api/v1/store"
done