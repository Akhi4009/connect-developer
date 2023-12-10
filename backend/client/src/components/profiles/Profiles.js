import React,{useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux"
import Spinner from "../layout/Spinner"
import { getProfiles } from '../redux/profile/action'
import ProfileItem from './ProfileItem'

const Profiles = () => {

    const dispatch=useDispatch()

    const {profiles,isLoading} = useSelector(state=>state.profileReducer)
    // console.log(profiles,isLoading)

    // console.log(profiles,isLoading)
    useEffect(()=>{

        dispatch(getProfiles())
    },[dispatch])
    
  return (
    <>
    {profiles === null || isLoading ? <Spinner/> : <>
    
    <h1 className="large text-primary">Developer</h1>
    <p className="lead">
    <i className="fab fa-connectdevelop"></i> Browse and connect with developers
    </p>
    <div className="profiles">
    {profiles?.length>0 ? profiles.map(profile=>
        <ProfileItem key={profile._id} profile={profile} />
        ):<h4>No profile found.....</h4>
    }
    </div>

    </>
  }
  </>
  
  )
}

export default Profiles