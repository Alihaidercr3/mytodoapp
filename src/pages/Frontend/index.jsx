import React from "react";
import { Route,Routes } from "react-router-dom";
import Home from "./Home";
import Header from "./Components/Header/index"
import Footer from "./Components/Footer/footer";
import Todos from "./Todos/todos";




const Index = () => {
  return (
  <>
  <Header/> 
    <Routes>
       <Route path="/todos" element={<Todos/>} />  
      <Route path="/"  element = {<Home/>}>
      </Route>
    </Routes>
     <Footer/>
</>
  );
};

export default Index;
