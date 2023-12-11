import axios from "axios";
import { 
    CLEAR_PROFILE,
     GET_PROFILE,
     PROFILE_ERROR,
     UPDATE_PROFILE,
     ACCOUNT_DELETED,
     GET_PROFILES,
     GET_REPOS
     } from "./actionType";

import {setAlert} from "../alert/action"


// Get current profile

export const getCurrentProfile=()=>async dispatch=>{

    try {
        const res= await axios.get(`http://localhost:5001/profile/me`)
         

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        
    } catch (error) {
       
        // console.log(error)
        dispatch({ type: CLEAR_PROFILE });

        
        dispatch({
            type:PROFILE_ERROR,
            payload:{
                msg:error.response.statusText,
                status:error.response.status
            }
        })
    }
}

// Get All profile

export const getProfiles=()=>async dispatch=>{

    dispatch({type:CLEAR_PROFILE})

    try {
        const res= await axios.get(`http://localhost:5001/profile`)
        // console.log(res.data)

        dispatch({
            type:GET_PROFILES,
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

// Get Profile By User Id

export const getUserProfile=(userId)=>async dispatch=>{

    // console.log(userId);
    

    try {
        const res= await axios.get(`http://localhost:5001/profile/user/${userId}`)
        
        //   console.log(res)

         dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        
    } catch (error) {
       
        // console.log(error)
        dispatch({type:CLEAR_PROFILE})

        
        dispatch({
            type:PROFILE_ERROR,
            payload:{
                msg:error.response.statusText,
                status:error.response.status
            }
        })
    }
}

// Get Github Repos

export const getGithubRepos=(username)=>async dispatch=>{

    try {
        const res= await axios.get(`http://localhost:5001/profile/github/${username}`)
        // console.log(res.data)

        dispatch({
            type:GET_REPOS,
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

        const res= await axios.post(`http://localhost:5001/profile`,formData,config)
        
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        dispatch(setAlert((edit ? 'Profile Updated' : 'Profile Created'),'success'))

        if(!edit){
            navigate('/dashboard')

        }
    } catch (error) {
        
         const err=error.response.data
        console.log(error)

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


//  Add Expereince

export const addExperience=(formData,navigate)=>async dispatch=>{

    try {
        const config={
            headers:{
                'Content-type': 'application/json'
            }
        }

        const res= await axios.put(`http://localhost:5001/profile/experience`,formData,config)
        
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('experience added','success'))

        navigate('/dashboard')

        
    } catch (error) {
        
         const err=error.response.data
        console.log(error)

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

//Add Education 

export const addEducation=(formData,navigate)=>async dispatch=>{

    try {
        const config={
            headers:{
                'Content-type': 'application/json'
            }
        }

        const res= await axios.put(`http://localhost:5001/profile/education`,formData,config)
        
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('education added','success'))

        navigate('/dashboard')

        
    } catch (error) {
        
         const err=error.response.data
        console.log(error)

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

//  Delete Experience

export const deleteExperience=(id)=>async dispatch=>{

    try {
        

        const res= await axios.delete(`http://localhost:5001/profile/experience/${id}`)
        
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('experience deleted','success'))

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


// Delete Education

export const deleteEducation=(id)=>async dispatch=>{

    try {
        

        const res= await axios.delete(`http://localhost:5001/profile/education/${id}`)
        
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('education deleted','success'))

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


//  Delete account  and profile

export const deleteAccount=()=> async dispatch=>{

    if(window.confirm('Are you sure to delete account?')){

        try {
        
            const res= await axios.delete(`http://localhost:5001/profile`)
            console.log(res)
            
            dispatch({type:CLEAR_PROFILE})
            dispatch({type:ACCOUNT_DELETED})

            dispatch(setAlert('Your Account has been pernanently  deleted',))
    
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
}

