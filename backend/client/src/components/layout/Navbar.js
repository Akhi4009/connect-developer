import React from 'react'
import {Link} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import {logOut} from "../redux/auth/action"

const Navbar = () => {

  const {isAuth,isLoading} = useSelector(state=>state.authReducer)
  // console.log(isLoading,isAuth)
  const dispatch=useDispatch()

const authLinks=(

  <ul>
      <li>
      <Link to="/profiles">Developers</Link>
      </li>
      <li>
      <Link to="/posts">Posts</Link>
      </li>
        <li><Link to="/dashboard">
        <i className='fas fa-user'/>{' '}
          <span className='hide-sm'> Dashboard </span>
        </Link></li>
        <li>
        <a onClick={()=>dispatch(logOut())} href='#!' >
        <i className='fas fa-sign-out-alt'/>{' '}
        <span className='hide-sm'>Logout</span>
        </a>
        
        </li>
        
  </ul>
)

const guestLinks=(

  <ul>
        <li><Link to="/profiles">Developers</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="login">Login</Link></li>
      </ul>
)
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      { !isLoading && (<>{isAuth ? authLinks : guestLinks}</>) }
    </nav>
  )
}

export default Navbar