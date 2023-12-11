import { ADD_POST, DELETE_POST, GET_POSTS,POST_ERROR, UPDATE_LIKES } from "./actionType";


const initiaState={
    posts:null,
    post:null,
    isLoading:true,
    error:{}
}

export const reducer=(state=initiaState,{type,payload})=>{

    switch(type){

        case GET_POSTS:
            return {...state,isLoading:false,posts:payload};

        case ADD_POST:
            return {...state,posts:[payload,...state.posts],isLoading:false};

        case DELETE_POST:
            return {...state,posts:state.posts.filter(post=>post._id!==payload)};
            
        case POST_ERROR:
            return{...state,isLoading:false,error:payload}

        case UPDATE_LIKES:
            return {...state,posts:state.posts.map(post=>post._id===payload.id ? {...post,likes:payload.likes}:post)}
        default:
            return state;
    }
}