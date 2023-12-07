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

// Create or Update profile

export const createProfile=(formData,navigate,edit=false)=> async dispatch=>{

    try {
        const config={
            headers:{
                'Content-type': 'application/json'
            }
        }

        const res= await axios.post(`http://localhost:5000/profile`,formData,config)
        
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created','success'))

        if(!edit){
            navigate('/dashboard')

        }
    } catch (error) {
        
         const err=error.response.data
        console.log(err)

         if(err){
            err.map(err=>dispatch(setAlert(err.msg,'danger')))

         }
        
        dispatch({
            type:PROFILE_ERROR,
            payload:{
                msg:error.response.statusText,
                status:error.response.status
            }
        })
    }
}