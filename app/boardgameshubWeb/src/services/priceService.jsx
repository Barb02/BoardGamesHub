import client from "./client";

const priceService = {
    async addPrice(gameID, storeID){
        return await client.post(`/price/${gameID}/${storeID}`)
    }
}

export default priceService;