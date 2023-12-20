import client from "./client";

const accountService = {
    async signup(data){
        return await client.post("/auth/signup",data)
    },

    async signin(data){
        return await client.post("/auth/signin",data)
    },

    async getWishlist(query){
        return await client.get(`/user/wishlist?q=${query}`)
    },

    async deleteGameWishlist(id){
        return await client.delete(`/user/wishlist/${id}`)
    },

    async addGameWishlist(id){
        return await client.post(`/user/wishlist/${id}`)
    },

    async getGameWishlist(id){
        return await client.get(`/user/wishlist/${id}`);
    },

    async getPricesWishlist(){
        return await client.get(`/user/wishlist/prices`)
    }
}

export default accountService;