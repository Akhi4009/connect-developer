import {Route,Routes} from "react-router-dom"
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from "./components/layout/Landing"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import Alert from "./components/layout/Alert";
function App() {
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
