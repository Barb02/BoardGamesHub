import client from "./client";

const gameService = {
    async getGame(id){
        return await client.get(`/game/${id}`)
    },

    async getGames(query="", sort="name", order="asc", categories="", players, complexities="", playtimes, price){
        console.log(categories);
        return await client.get(`/game?q=${query}&orderBy=${sort}&order=${order}&categories=${categories}&players=${players[0]}_${players[1]}&complexity=${complexities[0]}_${complexities[1]}&playtime=${playtimes[0]}_${playtimes[1]}&price=${price[0]}_${price[1]}`)
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

    async getPopularGames(limit, publisher=""){
        return await client.get(`/game/top?limit=${limit}&publisher=${publisher}`)
    },

    async getNewGames(publisher="", order="desc"){
        return await client.get(`/game?orderBy=yearPublished&publisher=${publisher}&order=${order}`)
    }
}

export default gameService;