import React, { useEffect } from 'react'
import {Link} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import {deleteAccount, getCurrentProfile} from "../redux/profile/action"
import Spinner from '../layout/Spinner'
import DashboardAction from './DashboardAction'
import Experiences from './Experiences'
import Educations from './Educations'

const Dashboard = () => {

  const {user}=useSelector(state=>state.authReducer)
  const {profile,isLoading}=useSelector(state=>state.profileReducer)
  const education=(profile?.education);
  const experience=(profile?.experience);
  
  const dispatch=useDispatch()

  useEffect(()=>{

    dispatch(getCurrentProfile())

  },[dispatch])


  return (
    <>
    { isLoading ? <Spinner/> :
    <>
    <h1 className='large text-primary'>Dashboard</h1>
    <p className='lead'>
    <i className='fa fa-user'></i>Welcome {user &&user.name}
    </p>
   
    {profile !== null ? <><DashboardAction/></> : <><Link to="/createprofile" className='btn btn-primary'>create profile</Link></>}
    
   {experience && experience.length>0 && <Experiences experience={experience}/> } 
    {education && education.length>0 && <Educations education={education}/>}
    <div className="my-2">
            <button className="btn btn-danger" onClick={()=>dispatch(deleteAccount())}>
            <i className="fas fa-user-minus"></i>
Delete My Account
            </button>
          </div>
          </>
  }
    </>
  )
}

export default Dashboard