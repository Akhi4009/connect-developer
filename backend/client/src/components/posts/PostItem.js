import React from 'react'
import {Link} from "react-router-dom"
import Moment from "react-moment"
import { useSelector } from 'react-redux'

const PostItem = ({post}) => {
    const {avatar,name,text,date,likes,comments,user,_id} = post

    const {isLoading,user:user1}=useSelector(state=>state.authReducer)
  return (
    <>
    <div className="post bg-white p-1 my-1">
          <div>
            <Link to="/profile">
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
            <button type="button" className="btn btn-light">
              <i className="fas fa-thumbs-up"></i>{' '}
              {likes.length>0 && (
                <span>{likes.length}</span>
              )}
              
            </button>
            <button type="button" className="btn btn-light">
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
                className="btn btn-danger"
              >
                <i className="fas fa-times"></i>
              </button>
              )}
            
          </div>
        </div>
    </>
  )
}

export default PostItem