import  { useState,useEffect } from 'react'
import {Link,useNavigate} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { setAlert } from '../redux/alert/action'
import { register } from '../redux/auth/action'


const Register = () => {

  const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:"",
    password2:""
  })
 
  const dispatch=useDispatch()
  const Navigate=useNavigate()
  const auth=useSelector(state=>state.authReducer)

  const handleChange=(e)=>{

    const {name,value}=e.target
    setFormData({...formData,[name]:value})

  }

  const handleSubmit=(e)=>{
    e.preventDefault()

    if(password !== password2){
      dispatch(setAlert('Password do not match','danger'));
    }else{
     dispatch(register({name,email,password}))
    }
  }
  useEffect(()=>{
    if(auth.isAuth){
       console.log(auth.isAuth)
       Navigate("/")
     }
   },[auth.isAuth,Navigate])


  const {name,email,password,password2}=formData
  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e)=>handleChange(e)}
           required />
        </div>
        <div className="form-group">
          <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={(e)=>handleChange(e)}
           required

           />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={(e)=>handleChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  )
}

export default Register