import { privateAxios as axios } from "./Helper";

export const createPost = async(postData)=>{
    console.log(postData);
   const response = await axios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`,postData).then(response=> response)
   return response.data;
}