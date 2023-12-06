import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({children}) => {
    
    const {isAuth}=useSelector(state=>state.authReducer)
  

   
    if(isAuth===null){
      return <Navigate to="/login" />
    }
    return children;
  };
  
  export default PrivateRoute;