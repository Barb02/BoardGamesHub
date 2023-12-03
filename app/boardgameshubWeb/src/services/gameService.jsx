import client from "./client";

const gameService = {
    async getGame(id){
        return await client.get(`/game/${id}`)
    },

    async getGames(query){
        return await client.get(`/game?q=${query}`)
    },

    async getLastPrices(id){
        return await client.get(`/price/${id}`)
    },

    async getLowestPrice(id){
        return await client.get(`/price/lowest/${id}`)
    }
}

export default gameService;