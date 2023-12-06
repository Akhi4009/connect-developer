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
     </Routes>
     </section>
     
    </>
  );
}

export default App;
