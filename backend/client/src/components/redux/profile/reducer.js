import { 
    PROFILE_ERROR,
    GET_PROFILE, 
    CLEAR_PROFILE,
     UPDATE_PROFILE,
     GET_PROFILES,
     GET_REPOS
     } from "./actionType"

const initialState={
    profile:null,
    profiles:null,
    repos:[],
    isLoading:true,
    error:{}
}

export const reducer=(state=initialState,{type,payload})=>{


    switch(type){
        
        case UPDATE_PROFILE:
        case GET_PROFILE:
            return {...state,profile:payload,isLoading:false,error:{}};

        case GET_PROFILES:
            return{...state,profiles:payload,isLoading:false,error:{}};
        
        case GET_REPOS:
            return {...state,repos:payload,isLoading:false,error:{}};  

        case PROFILE_ERROR:
            return {...state,error:payload,isLoading:false};

        case CLEAR_PROFILE:
            return{...state,profile:null,repos:[],isLoading:false,error:{}}

        default:
            return state
    }

}