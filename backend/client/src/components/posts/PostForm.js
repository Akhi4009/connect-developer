import React,{useState} from 'react'
import { addPost } from '../redux/post/action'
import { useDispatch } from 'react-redux'

const PostForm = () => {

    const [text,setText] = useState("")
    const dispatch=useDispatch()
 const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(addPost({text}))
    setText("")

 }
  return (
    <>
    <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={handleSubmit}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
            value={text}
            onChange={(e)=>setText(e.target.value)}
          ></textarea>
          <input type="submit" name="post" className="btn btn-dark my-1" value="Submit" autoComplete='post' />
        </form>
      </div>
    </>
  )
}

export default PostForm