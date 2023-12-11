import React from 'react'
import Moment from "react-moment"
import {Link} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import {deleteComment} from "../redux/post/action"

const CommentItem = ({comment,postId}) => {
const {avatar,name,text,date,user,_id} = comment

const dispatch=useDispatch();
const {isLoading,user:user1} = useSelector(state=>state.authReducer)
// console.log(user,user1._id)
  return (
    <>
    <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img
          className="round-img"
          src={avatar}
          alt={name}
        />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">
        {text}
      </p>
       <p className="post-date">
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      {!isLoading && user === user1._id && (
        <button type="button" 
        className="btn btn-danger"
        onClick={()=>dispatch(deleteComment(postId,_id))}>
        <i className='fas fa-times'/>
        </button>
        
      )}
    </div>
  </div>

    </>
  )
}

export default CommentItem