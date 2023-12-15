import client from "./client";

const gameService = {
    async getGame(id){
        return await client.get(`/game/${id}`)
    },

    async getGames(query, sort, order="asc", price, players, playtime, categories, complexity){
        return await client.get(`/game?q=${query}&orderBy=${sort}&order=${order}`)
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

    async getPopularGames(limit, publisher){
        return await client.get(`/game/top?limit=${limit}&publisher=${publisher}`)
    },

    async getNewGames(publisher, order="desc"){
        return await client.get(`/game?orderBy=yearPublished&publisher=${publisher}&order=${order}`)
    }
}

export default gameService;