import { create } from "zustand";


export const useUserStore = create((set,get)=>({
    token: null,
    username: null,
    logged:false,

    login: (token,username) => {

        set(()=>({
            token:token,
            username:username,
            logged:true,
        }))
    },

    logout: ()=>{
        set(()=>({
            token:null,
            username:null,
            logged:false,
        }))
    }
}))