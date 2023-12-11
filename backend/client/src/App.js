import {Route,Routes} from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from "./components/layout/Landing"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import Alert from "./components/layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./components/redux/auth/action";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./routing/PrivateRoute";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import AddExpeience from "./components/profile-form/AddExpeience";
import AddEducation from "./components/profile-form/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

if(localStorage.token){
  setAuthToken(localStorage.token)
}
function App() {

  const dispatch=useDispatch()
  useEffect(()=>{

    dispatch(loadUser())
  },[dispatch])

  return (
    <>
    
     <Navbar/>
     
     
    <section className="container">
    <Alert/>
     <Routes>
    
     <Route path="/" element={<Landing/>}/>
     <Route path="/register" element={<Register/>} />
     <Route path="/login" element={<Login/>}/>
     <Route path="/profiles" element={<Profiles/>}/>
     <Route path="/profile/:id" element={<Profile/>}/>
     <Route path="/posts" element={<PrivateRoute><Posts/></PrivateRoute>}/>
     <Route path="/post/:id" element={<PrivateRoute><Post/></PrivateRoute>}/>
     <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
     <Route path="/createprofile" element={<PrivateRoute><CreateProfile/></PrivateRoute>}/>
     <Route path="/edit-profile" element={<PrivateRoute><EditProfile/></PrivateRoute>}/>
     <Route path="/add-experience" element={<PrivateRoute><AddExpeience/></PrivateRoute>}/>
     <Route path="/add-education" element={<PrivateRoute><AddEducation/></PrivateRoute>}/>
     </Routes>
     
     </section>
     
     
    </>
  );
}

export default App;
