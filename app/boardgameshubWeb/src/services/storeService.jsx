import client from "./client";

const storeService = {
    async getStores(){
        return await client.get(`/stores`)
    }
}

export default storeService;