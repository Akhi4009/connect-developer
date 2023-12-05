import { REGISTER_SUCCESS,REGISTER_FAILURE } from "./actionType";

const initialState={
    token: localStorage.getItem('token'),
    isAuth:null,
    isLoading:true,
    user:null,
}

export const reducer =(state=initialState,{type,payload})=>{

    switch (type){

        case REGISTER_SUCCESS:
            localStorage.setItem('token',payload.token)
            return {...state,...payload,isAuth:true,isLoading:false}

        case REGISTER_FAILURE :
            localStorage.removeItem('token')
            return {...state,...payload,isAuth:false,isLoading:false}
    

        default :
        return state
    }
}