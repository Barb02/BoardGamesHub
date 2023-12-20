import client from "./client";

const priceService = {
    async addPrice(gameID, storeID, data){
        return await client.post(`/price/${gameID}/${storeID}`, data)
    }
}

export default priceService;