import client from "./client";

const gameService = {
    async getGame(id){
        return await client.get(`/game/${id}`)
    },

    async getGames(query, sort){
        return await client.get(`/game?q=${query}&orderBy=${sort}`)
    },

    async getLastPrices(id){
        return await client.get(`/price/${id}`)
    },

    async getLowestPrice(id){
        return await client.get(`/price/lowest/${id}`)
    },

    async getHistoryPriceGraph(id){
        return await client.get(`/price/history/${id}`)
    },

    async getPopularGames(limit){
        return await client.get(`/game/top?limit=${limit}`)
    },

    async getNewGames(){
        return await client.get(`/game?orderBy=yearPublished`)
    }
}

export default gameService;