import React from 'react'
import Moment from "react-moment"
import {Link} from "react-router-dom"

const CommentItem = ({comment,postId}) => {

const {avatar,name,text,date,user} = comment
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
    </div>
  </div>

    </>
  )
}

export default CommentItem