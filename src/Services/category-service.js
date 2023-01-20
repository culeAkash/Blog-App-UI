import {myAxios as axios} from "./Helper"

export const loadAllCategories = ()=>{
    return axios.get("/categories").then(response=>response.data);
}
