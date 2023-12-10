import axios from "axios"
import {GET_POSTS,POST_ERROR} from "./actionType"


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