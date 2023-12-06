import React, { useEffect } from 'react'
import {Link} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import {getCurrentProfile} from "../redux/profile/action"
import Spinner from '../layout/Spinner'

const Dashboard = () => {

  const {user}=useSelector(state=>state.authReducer)
  const {profile,isLoading}=useSelector(state=>state.profileReducer)
  
  
  const dispatch=useDispatch()
  useEffect(()=>{

    dispatch(getCurrentProfile())

  },[])


  return (
    <>
    { isLoading && profile===null &&<Spinner/>}
    <>
    <h1 className='large text-primary'>Dashboard</h1>
    <p className='lead'>
    <i className='fa fa-user'></i>Welcome {user &&user.name}
    </p>
    </>
    {profile !== null ? <>has</> : <><Link to="/createprofile" className='btn btn-primary'>create profile</Link></>}
    </>
  )
}

export default Dashboard