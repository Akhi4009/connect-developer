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
import CreateProfile from "./components/profile/CreateProfile";
import EditProfile from "./components/profile/EditProfile";
import AddExpeience from "./components/profile/AddExpeience";
import AddEducation from "./components/profile/AddEducation";

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
     <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
     <Route path="/register" element={<Register/>} />
     <Route path="/login" element={<Login/>}/>
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
