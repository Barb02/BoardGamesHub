import client from "./client";

const accountService = {
    async signup(data){
        return await client.post("/auth/signup",data)
    },

    async signin(data){
        return await client.post("/auth/signin",data)
    },

    async getCategories(){
        return await client.post("/user/categories")
    },

    async setCategories(data){
        return await client.put("/user/categories")
    }
}

export default accountService;