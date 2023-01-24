import axios from 'axios' 
import { getJWTToken } from '../Auth/auth';


export const BASE_URL = 'http://localhost:8080/api/v1'; 


//Now by using this axios variable we can call our server api
export const myAxios = axios.create({
    baseURL : BASE_URL
})


//We will use a private axios to send all requests after the login of the user
export const privateAxios = axios.create({
    baseURL : BASE_URL
})

//setting JWT token when sending requests after login of the user
privateAxios.interceptors.request.use((config)=>{
    const token = getJWTToken();

    if(token){
        config.headers.common.Authorization = `Bearer ${token}`
    }

    return config;
},error=>{
    return Promise.reject(error)
})