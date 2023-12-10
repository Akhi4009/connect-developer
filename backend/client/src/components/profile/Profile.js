import React, { useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux"
import { Link, useParams} from "react-router-dom"
import { getUserProfile } from '../redux/profile/action'
import Spinner from "../layout/Spinner"
const Profile = () => {

    const dispatch =useDispatch()
     const {id} = useParams()

     const {profile,isLoading} = useSelector(state=>state.profileReducer)
     const {isAuth,isLoading:loading,user} = useSelector(state=>state.authReducer)

        console.log( user?._id===profile?.user._id)
    
   

    useEffect(()=>{
        
        dispatch(getUserProfile(id))
        
    },[dispatch,id])
  return (
    <>
    {profile===null || isLoading ? (
        <Spinner/>
        ):(
            <>
            <Link to="/profiles" className='btn btn-primary'>
            Back To Profiles
            </Link>
            {isAuth && !loading && user?._id === profile?.user._id &&(
                <Link to="/edit-profile" className='btn btn-dark'>
                Edit Profile
                </Link>
            )}
            </>
        )
    }

    </>
  )
}

export default Profile