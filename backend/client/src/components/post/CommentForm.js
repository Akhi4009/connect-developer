import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import {useParams} from "react-router-dom"
import {addComment} from "../redux/post/action"


const CommentForm = () => {

    const [text,setText]=useState("")

    const dispatch=useDispatch()
    const {id} = useParams()

    const handleSubmit=(e)=>{

        e.preventDefault()
        dispatch(addComment(id,{text}))
        setText("")
    }

  return (
    <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave a comment</h3>
        </div>
        <form className="form my-1" onSubmit={handleSubmit}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            required
            value={text}
            onChange={(e)=>setText(e.target.value)}
          ></textarea>
          <input type="submit" name="post" className="btn btn-dark my-1" value="Submit" autoComplete='post' />
        </form>
      </div>
  )
}

export default CommentForm