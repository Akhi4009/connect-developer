import axios from "axios"
import {GET_POSTS,POST_ERROR,UPDATE_LIKES} from "./actionType"

// Get All Posts


export const getPosts = () =>async dispatch =>{

   try {
    
    const res = await axios.get(`http://localhost:5001/posts`);

    dispatch({
        type:GET_POSTS,
        payload:res.data
    });

   } catch (err) {
    console.log(err)
    dispatch({
        type:POST_ERROR,
        payload:{msg:"err.responce.statusText",status:err.response.status}
    })
   }
}


// Add Like

export const addLike = (id) =>async dispatch =>{

    try {
     
     const res = await axios.put(`http://localhost:5001/posts/like/${id}`);
 
     dispatch({
         type:UPDATE_LIKES,
         payload:{id, likes:res.data}
     });
 
    } catch (err) {

     console.log(err.response)

     dispatch({
         type:POST_ERROR,
         payload:{msg:err?.response?.statusText,status:err?.response?.status}
     })
    }
 }

 // Remove Like

 export const removeLike = (id) =>async dispatch =>{

    try {
     
     const res = await axios.put(`http://localhost:5001/posts/unlike/${id}`);
 
     dispatch({
         type:UPDATE_LIKES,
         payload:{id, likes:res.data}
     });
 
    } catch (err) {

     console.log(err)

     dispatch({
         type:POST_ERROR,
         payload:{msg:err?.response?.statusText,status:err?.response?.status}
     })
    }
 }