import { useEffect, useState } from "react"
import {Link,useNavigate} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"

import { login } from "../redux/auth/action"

const Login = () => {

  const [formData,setFormData]=useState({
    email:"",
    password:"",
   
  })

  const Navigate=useNavigate()

  const dispatch=useDispatch()
  const auth=useSelector(state=>state.authReducer)
//  console.log(auth)
  
  const handleChange=(e)=>{

    const {name,value}=e.target
    setFormData({...formData,[name]:value})

  }

  const {email,password}=formData

  const handleSubmit=(e)=>{
    e.preventDefault()
   
    dispatch(login({email,password}))
  
  }

useEffect(()=>{
 if(auth.isAuth){
    console.log(auth.isAuth)
    Navigate("/dashboard")
  }
},[auth.isAuth,Navigate])

  
  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" onSubmit={handleSubmit}>
       
        <div className="form-group">
          <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={(e)=>handleChange(e)}
          required

           />
         
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e)=>handleChange(e)}
          />
        </div>
       
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
      Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  )
}

export default Login