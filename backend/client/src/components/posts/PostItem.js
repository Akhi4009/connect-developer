import React from 'react'
import {Link} from "react-router-dom"
import Moment from "react-moment"
import { useDispatch, useSelector } from 'react-redux'
import {addLike,deletePost,removeLike} from "../redux/post/action"

const PostItem = ({post,showActions=true}) => {
    const {avatar,name,text,date,likes,comments,user,_id} = post
    const dispatch=useDispatch()

    const {isLoading,user:user1}=useSelector(state=>state.authReducer)
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

            {showActions && <>
              <button onClick={()=>dispatch(addLike(_id))} type="button" className="btn btn-light">
              <i className="fas fa-thumbs-up"></i>{' '}
              {likes.length>0 && (
                <span>{likes.length}</span>
              )}
              
            </button>
            <button type="button" onClick={()=>dispatch(removeLike(_id))} className="btn btn-light">
              <i className="fas fa-thumbs-down"></i>
            </button>

            <Link to={`/post/${_id}`} className="btn btn-primary">
              Discussion {comments.length>0 &&(
                <span className='comment-count'>{comments.length}</span>
              )} 
              </Link>

              {!isLoading && user===user1._id && (
                <button      
                type="button"
                onClick={()=>dispatch(deletePost(_id))}
                className="btn btn-danger"
              >
                <i className="fas fa-times"></i>
              </button>
              )}
              </>}



            
          </div>
        </div>
    </>
  )
}

export default PostItem