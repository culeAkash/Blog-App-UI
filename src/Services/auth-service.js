//This file contains all request configurations for User signup and login

import { myAxios as axios } from "./Helper";

//Register new user request service

export const register =  async (user)=>{
    const response =  await axios.post('/auth/register',user);
    return response.data
}

export const login = async (loginData)=>{
    const response = await axios.post('/auth/login',loginData);
    return response.data;
}