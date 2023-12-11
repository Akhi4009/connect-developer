import axios from "axios"
import {ADD_POST, DELETE_POST, GET_POSTS,POST_ERROR,UPDATE_LIKES,GET_POST, ADD_COMMENT, REMOVE_COMMENT} from "./actionType"
import {setAlert} from "../alert/action"

// Get All Posts


export const getPosts = () =>async dispatch =>{

   try {
    
    const res = await axios.get(`http://localhost:5001/posts`);

    dispatch({
        type:GET_POSTS,
        payload:res.data
    });

   } catch (err) {
    // console.log(err)
    dispatch({
        type:POST_ERROR,
        payload:{msg:"err.responce.statusText",status:err.response.status}
    })
   }
}

// Get single Post


export const getPost = (id) =>async dispatch =>{

    try {
     
     const res = await axios.get(`http://localhost:5001/posts/${id}`);
 
     dispatch({
         type:GET_POST,
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


 // Delete Post


 export const deletePost = (id) =>async dispatch =>{

    try {
     
     await axios.delete(`http://localhost:5001/posts/${id}`);
 
     dispatch({
         type:DELETE_POST,
         payload:id
     });

     dispatch(setAlert('Post Removed','success'))
 
    } catch (err) {

    console.log(err)
 dispatch({
         type:POST_ERROR,
         payload:{msg:err?.response?.statusText,status:err?.response?.status}
     })
    }
 }


 // Add Post

export const addPost = (formData) =>async dispatch =>{
// console.log(formData)
    const config={
        headers:{
            'Content-Type': 'application/json'
        }
    }

    try {
     
     const res= await axios.post(`http://localhost:5001/posts`,formData,config);
//  console.log(res);
     dispatch({
         type:ADD_POST,
         payload:res.data
     });
     dispatch(setAlert('Post created','success'))
 
    } catch (err) {

     console.log(err.response)

     dispatch({
         type:POST_ERROR,
         payload:{msg:err?.response?.statusText,status:err?.response?.status}
     })
    }
 }


 // Add Comment

export const addComment = (postId,formData) =>async dispatch =>{
    // console.log(formData)
        const config={
            headers:{
                'Content-Type': 'application/json'
            }
        }
    
        try {
         
         const res= await axios.post(`http://localhost:5001/posts/comment/${postId}`,formData,config);
    //   console.log(res);
         dispatch({
             type:ADD_COMMENT,
             payload:res.data
         });
         dispatch(setAlert('comment added','success'))
     
        } catch (err) {
    
        //  console.log(err.response)
    
         dispatch({
             type:POST_ERROR,
             payload:{msg:err?.response?.statusText,status:err?.response?.status}
         })
        }
     }


// Remove Comment
 
export const deleteComment=(postId,commentId)=>async dispatch=>{

    try {

        await axios.delete(`http://localhost:5001/posts/comment/${postId}/${commentId}`);
        //   console.log(res);
             dispatch({
                 type:REMOVE_COMMENT,
                 payload:commentId
             });
             dispatch(setAlert('comment removed','success'))
         

        
    } catch (err) {
        
        // console.log(err.response)
    
        dispatch({
            type:POST_ERROR,
            payload:{msg:err?.response?.statusText,status:err?.response?.status}
        })
    }
}
    