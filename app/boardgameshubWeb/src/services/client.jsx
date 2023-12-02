import axios from "axios";

// export const createClient = (baseUrl) =>{
//     const client = axios.create({
//         baseUrl: baseUrl,
//         timeout:5000        
//     });

//     client.interceptors.response.use(function (response) {
//         // Any status code that lie within the range of 2xx cause this function to trigger
//         // Do something with response data
//         return response.data;
//       }, function (error) {
//         // Any status codes that falls outside the range of 2xx cause this function to trigger
//         // Do something with response error
//         return Promise.reject(error);
//       });
    
//     return client;
//}

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