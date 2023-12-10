import { GET_POSTS,POST_ERROR } from "./actionType";


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

        case POST_ERROR:
            return{...state,isLoading:false,error:payload}

        default:
            return state;
    }
}