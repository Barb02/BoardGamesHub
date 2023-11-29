import { createClient } from "./client";

const client = createClient("localhost:8080/api/v1")

const gameService = {
    async getGame(id){
        return await client.get(`/game/${id}`)
    },

    async getLastPrices(id){
        return await client.get(`/price/${id}`)
    },
}

export default gameService;