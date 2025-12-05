import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Login from "../../pages/Authentication/login";



export default function Privateroute(props) {
  const { isAuth } = useContext(AuthContext);

  const {Component}=props

  if (!isAuth) {
    return<Login/>
    
  }

    return <Component />;
}
