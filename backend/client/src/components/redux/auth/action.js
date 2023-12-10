import axios from "axios"
import { 
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT ,
    
} from "./actionType";
import { CLEAR_PROFILE } from "../profile/actionType";
import  {setAlert} from "../alert/action"
import setAuthToken from "../../../utils/setAuthToken"


// LOAD USER

export const loadUser = ()=>  async(dispatch) =>{

    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get(`http://localhost:5001/auth`);

        // console.log(res)

        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
        
    } catch (error) {
        dispatch({
            type:AUTH_ERROR
        })
    }
}


// Register User

export const register=({name,email,password})=>async (dispatch)=>{
    

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({name,email,password});

    try {
        
        const res = await axios.post(`http://localhost:5001/users/register`,body,config)

        // console.log(res)

        dispatch({
            type:REGISTER_SUCCESS,
            payload:res['data']['token']
        })
        dispatch(setAlert(res.data.msg,'success'))
        dispatch(loadUser())
    } catch (error) {

         const err=error.response.data.errors
        console.log(error)

        if(error){
            err.map(err=>dispatch(setAlert(err.msg,'danger')))

        }

       
        dispatch({
            type:REGISTER_FAILURE
        })
    }

}

// Login User

export const login=({email,password})=>async (dispatch)=>{
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email,password});

    try {
        
        const res = await axios.post(`http://localhost:5001/auth/login`,body,config)

        // console.log(res)

        dispatch({
            type:LOGIN_SUCCESS,
            payload:res['data']['token']
        })

        dispatch(setAlert(res.data.msg,'success'))
        dispatch(loadUser())
        
    } catch (error) {

         const err =error.response.data.errors
        console.log(error)

        if(error){
            err.map(err=>dispatch(setAlert(err.msg,'danger')))

        }

       
        dispatch({
            type:LOGIN_FAILURE
        })
    }

}

export const logOut=()=>dispatch=>{

    dispatch({
        type:LOGOUT
    })
    dispatch({
        type:CLEAR_PROFILE
    })
}