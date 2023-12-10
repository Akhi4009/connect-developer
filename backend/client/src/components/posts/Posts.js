import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { getPosts } from '../redux/post/action'
import Spinner from "../layout/Spinner"
import PostItem from './PostItem'

const Posts = () => {

    const dispatch = useDispatch()
    const {posts,isLoading}=useSelector(state=>state.postReducer)

    useEffect(()=>{
    
        dispatch(getPosts())

    },[dispatch])

  return (
    <>
    {isLoading ? <Spinner/> :(<>
      
      <h1 className="large text-primary">
      Posts
    </h1>
    <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>

    {/*Post form*/}

    <div className="posts">
    {posts?.map(post=>(
      <PostItem key={post._id} post={post}/>
    ))}
    </div>
    </>

    )}

    </>
  )
}

export default Posts