import axios from "axios";
import { GET_PROFILE,PROFILE_ERROR } from "./actionType";
import {setAlert} from "../alert/action"


// Get current profile

export const getCurrentProfile=()=>async dispatch=>{

    try {
        const res= await axios.get(`http://localhost:5000/profile/me`)
        // console.log(res.data)

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        
    } catch (error) {
        console.log(error)
        dispatch({
            type:PROFILE_ERROR,
            payload:{
                msg:error.response.statusText,
                status:error.response.status
            }
        })
    }
}