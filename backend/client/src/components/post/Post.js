import React, { useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux"
import {useParams,Link} from "react-router-dom"
import {getPost} from "../redux/post/action"
import Spinner from "../layout/Spinner"
import PostItem from "../posts/PostItem"
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'


const Post = () => {

    const  {id}=useParams()
    const dispatch=useDispatch()
    const {post,isLoading}=useSelector(state=>state.postReducer)

    useEffect(()=>{
        
        dispatch(getPost(id))

    },[dispatch,id])

  return isLoading || post === null ? <Spinner/> : <>
  <Link to="/posts" className='btn'>Back To Posts</Link>
  <PostItem post={post} showActions={false}/>
  <CommentForm/>
  <div className='comments'>
  {post.comments.map(comment=>(
    <CommentItem key={comment._id} comment={comment} postId={post._id}/>
  ))}
  </div>
  </>
}

export default Post