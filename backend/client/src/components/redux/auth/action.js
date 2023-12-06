import axios from "axios"
import { REGISTER_FAILURE,REGISTER_SUCCESS,USER_LOADED,AUTH_ERROR } from "./actionType";
import  {setAlert} from "../alert/action"
import setAuthToken from "../../../utils/setAuthToken"


// LOAD USER

export const loadUser = ()=>  async(dispatch) =>{

    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get(`http://localhost:5000/auth`);

        console.log(res)

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
        
        const res = await axios.post(`http://localhost:5000/users/register`,body,config)

        console.log(res)

        dispatch({
            type:REGISTER_SUCCESS,
            payload:res['data']['token']
        })
        dispatch(setAlert(res.data.msg,'success'))
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