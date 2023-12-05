import axios from "axios"
import {useReducer} from "react-redux"
import { REGISTER_FAILURE,REGISTER_SUCCESS } from "./actionType";
import  {setAlert} from "../alert/action"

// Register User

export const register=({name,email,password})=>async (dispatch)=>{
    

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({name,email,password});

    try {
        
        const res = await axios.post(`http://localhost:5000/users/register`,body,config)

        console.log(res)

        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data.token
        })
    } catch (error) {

        const err=error.response.data.errors
        console.log(err)

        if(err){
            err.map(err=>dispatch(setAlert(err.msg,'danger')))

        }

       
        dispatch({
            type:REGISTER_FAILURE
        })
    }

}