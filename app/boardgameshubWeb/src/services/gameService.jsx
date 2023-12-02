import client from "./client";

const gameService = {
    async getGame(id){
        return await client.get(`/game/${id}`)
    },

    async getLastPrices(id){
        return await client.get(`/price/${id}`)
    },

    async getGames(query){
        return await client.get(`/game?q=${query}`)
    }
}

export default gameService;