import { ACCOUNT_DELETED } from "../profile/actionType";
import { 
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAILURE, 
    LOGOUT
           
} from "./actionType";


const initialState={
    token: localStorage.getItem('token'),
    isAuth:null,
    isLoading:true,
    user:null,
}

export const reducer =(state=initialState,{type,payload})=>{

    // console.log(payload)
    switch (type){

        case USER_LOADED :
            return {...state,isAuth:true,isLoading:false,user:payload}

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload)
            return {...state,token:payload,isAuth:true,isLoading:false}

        case REGISTER_FAILURE :
        case AUTH_ERROR:
        case LOGIN_FAILURE:
        case LOGOUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token')
            return {...state,isAuth:null,isLoading:false}
    

        default :
        return state
    }
}