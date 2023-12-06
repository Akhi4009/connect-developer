import { PROFILE_ERROR,GET_PROFILE, CLEAR_PROFILE } from "./actionType"

const initialState={
    profile:null,
    profiles:[],
    repos:[],
    isLoading:true,
    error:{}
}

export const reducer=(state=initialState,{type,payload})=>{


    switch(type){

        case GET_PROFILE:
            return {...state,profile:payload,isLoading:false}
        case PROFILE_ERROR:
            return {...state,error:payload,isLoading:false}
        case CLEAR_PROFILE:
            return{...state,profile:null,repos:[],isLoading:false}

            
            default:
            return state
    }

}