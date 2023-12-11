import React, { useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux"
import { Link, useParams} from "react-router-dom"
import { getUserProfile } from '../redux/profile/action'
import Spinner from "../layout/Spinner"
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from "./ProfileExperience"
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'

const Profile = () => {

    const dispatch =useDispatch()
     const {id} = useParams()

     const {profile,isLoading} = useSelector(state=>state.profileReducer)
     const {isAuth,isLoading:loading,user} = useSelector(state=>state.authReducer)

        // console.log( user?._id===profile?.user._id)

    
  //  console.log(error)

    useEffect(()=>{
        
        dispatch(getUserProfile(id))
        
    },[dispatch,id])
    
    
   
  return (
    <>
    { profile !== null && !isLoading  ? (
      (
        <>
        <Link to="/profiles" className='btn btn-primary'>
        Back To Profiles
        </Link>
        {isAuth && !loading && user?._id === profile?.user._id &&(
            <Link to="/edit-profile" className='btn btn-dark'>
            Edit Profile
            </Link>
        )}
        <div className='profile-grid my-1'>
        <ProfileTop profile={profile}/>

        <ProfileAbout profile={profile}/>

        <div className="profile-exp bg-white p-2">

      <h2 className="text-primary">Experience</h2>
      {profile?.experience?.length>0 ?(<>
        {profile.experience.map(experience=>(
            <ProfileExperience key={experience._id} experience={experience}/>
        ))}
        </>):(
            <h4>No experience crendential</h4>
        )}
      </div>

      <div className="profile-edu bg-white p-2">
        
      <h2 className="text-primary">Education</h2>
      {profile?.education?.length>0 ?(<>
        {profile.education.map(education=>(
            <ProfileEducation key={education._id} education={education}/>
        ))}
        </>):(
            <h4>No education crendential</h4>
        )}
      </div>

      { profile!==null && profile?.githubusername && (
        <ProfileGithub username={profile.githubusername}/>
      )}
        </div>
        </>
    )
        ): (
          <Spinner/>
        )
          
    }

    </>
  )
}

export default Profile