import { Route, Routes, Navigate } from "react-router-dom";
import Frontend from "./Frontend";
import Authentication from "./Authentication";
import Dashboard from "./Dashboard";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Privateroute from "../assets/components/privateroute";

const Index = () => {
  const { isAuth } = useContext(AuthContext);
 
  return (
    <>
      <Routes>
        <Route path="/dashboard/*" element={<Privateroute Component={Dashboard} />}/>    
         
        
        <Route path="/*" element={<Frontend />}/>

        <Route path="/authentication/*" element={!isAuth ? <Authentication /> : <Navigate to="/" />}/>
      </Routes>
    </>
  );
};

export default Index;
