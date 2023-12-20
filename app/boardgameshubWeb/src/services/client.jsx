import axios from "axios";
import { useUserStore } from "../stores/useUserStore";

const client = axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
  timeout:5000,
})
client.interceptors.request.use(
  (config) => {
    if(useUserStore.getState().logged){
      config.headers.Authorization = `Bearer ${useUserStore.getState().token}`;
    }
    return config
  },
  (error) =>{
    return Promise.reject(error);
  }
)

client.interceptors.response.use(
  function (response){
    return response.data; 

  }, 
  function(error){

    const { response, config } = error;
    const logout = useUserStore.getState().logout

    if (response.data.message === "User not found"){
      logout()
    }

    return Promise.reject(error);
  }
)

export default client;