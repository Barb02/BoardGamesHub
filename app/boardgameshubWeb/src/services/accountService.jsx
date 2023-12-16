import client from "./client";

const accountService = {
    async signup(data){
        return await client.post("/auth/signup",data)
    },

    async signin(data){
        return await client.post("/auth/signin",data)
    },

    async getWishlist(){
        return await client.get("/user/wishlist")
    }
}

export default accountService;