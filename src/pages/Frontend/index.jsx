import React from "react";
import { Route,Routes } from "react-router-dom";
import Home from "./Home";
import Header from "./Components/Header/index"
import Footer from "./Components/Footer/footer";
import Todos from "./Todos/todos";
import About from "./About/about";
import Contact from "./Contact/contact";




const Index = () => {
  return (
  <>
  <Header/> 
    <Routes>
       <Route path="/todos" element={<Todos/>} />  
       <Route path="/about" element={<About/>} />  
       <Route path="/contact" element={<Contact/>} />  
      <Route path="/"  element = {<Home/>}>
      </Route>
    </Routes>
     <Footer/>
</>
  );
};

export default Index;
