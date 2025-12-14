import { Route, Routes, Navigate } from "react-router-dom";
import Frontend from "./Frontend";
import Authentication from "./Authentication";
import Dashboard from "./Dashboard";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Index = () => {
  const { isAuth } = useContext(AuthContext);
 
  return (
    <>
      <Routes>
        <Route path="/dashboard/*" element={isAuth?<Dashboard/>:<Navigate to="/" />}/>    
        <Route path="/authentication/*" element={!isAuth ? <Authentication /> : <Navigate to="/" />}/>
        <Route path="/*" element={<Frontend />}/>

      </Routes>
    </>
  );
};

export default Index;
