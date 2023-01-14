import axios from 'axios' 


export const BASE_URL = 'http://localhost:8080'; 


//Now by using this axios variable we can call our server api
export const myAxios = axios.create({
    baseURL : BASE_URL
})