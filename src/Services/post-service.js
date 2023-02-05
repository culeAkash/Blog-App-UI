import { privateAxios as axios } from "./Helper";
import { myAxios } from "./Helper";

export const createPost = async(postData)=>{
    console.log(postData);
   const response = await axios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`,postData).then(response=> response)
   return response.data;
}


//if no exclusive page number is specified then first page is returned
export const loadAllPosts = async(pageNumber,pageSize)=>{
    const response = await myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortDir=${'desc'}`);
    console.log(response.data);
    return response.data;
}


//get post details from backend with post with post id
export const getPost = async(postId)=>{
    const response = await axios.get(`/posts/${postId}`).then(response=> response)
    console.log(response.data);
    return response.data;
}