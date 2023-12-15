import axios from "axios";

const client = axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
  timeout:5000,
})

client.interceptors.response.use(function (response){
  return response.data; 

}, function(error){
  return Promise.reject(error);
})

export default client;