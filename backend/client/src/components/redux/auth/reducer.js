import { REGISTER_SUCCESS,REGISTER_FAILURE, USER_LOADED, AUTH_ERROR } from "./actionType";

const initialState={
    token: localStorage.getItem('token'),
    isAuth:null,
    isLoading:true,
    user:null,
}

export const reducer =(state=initialState,{type,payload})=>{

    switch (type){

        case USER_LOADED :
            return {...state,isAuth:true,isLoading:false,user:payload}

        case REGISTER_SUCCESS:
            localStorage.setItem('token',payload)
            return {...state,...payload,isAuth:true,isLoading:false}

        case REGISTER_FAILURE :
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return {...state,...payload,isAuth:false,isLoading:false}
    

        default :
        return state
    }
}