import React from "react";
import { useState,useContext } from "react";
import { Card,Spin,message } from 'antd';
import { AuthContext } from "../../../context/AuthContext";
import { doc, setDoc } from "firebase/firestore"; 
import { firestore } from "../../../config/firebase";

const intialState = {
  name: ""
  , hobby: ""
  , location: ""
}

const Hero = () => {
  const {user}= useContext(AuthContext)
  const [state, setState] = useState(intialState)
  const [isProcessing, setIsProcessing] = useState(false)
 const [messageApi, contextHolder] = message.useMessage();

 
 
 

  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }


  const handlesubmit = (e) => {
    e.preventDefault();
    setState(intialState)
let {name,hobby,location}= state

name=name.trim()
hobby=hobby.trim()
location=location.trim()
let formData ={name,hobby,location}
formData.id= window.getRandomId()
formData.createdBy={
  email: user.email,
  uid: user.uid
}
formData.status="active"
createDocument(formData)
  }
  const createDocument= async(formData)=>{ 
    setIsProcessing(true);
    try {
      await setDoc(doc(firestore, "todos", formData.id),formData);    
    messageApi.success("todo added")
      
    } catch (error) {
      console.log(error);
      messageApi.error("some thing went wrong")
      
  }
  setIsProcessing(false);
  }
  return (
    <form onSubmit={handlesubmit}>
      <div className="min-h-screen w-full ">
        <div className="flex justify-center items-start pt-20">
          <Card className=" rounded-2xl! shadow-2xl! mt-20! border-0! "
            title={<h1 className="text-2xl font-bold text-gray-800 text-center cursor-default">Todos</h1>} style={{ width: 300 }}>
            {contextHolder}
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700"></label>
            <input
              type="text"
              id="Name"
              name="name"
              className="w-full transform motion-safe:focus:scale-110   px-4 py-3 text-sm bg-white border border-gray-300 rounded-xl shadow-sm focus:border-grey-200 focus:shadow-md transition-all duration-200 hover:shadow-lg"
              placeholder="Enter Name"
              required
              onChange={handleChange}
              value={state.name}
            /> <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700"></label>
            <input
              type="text"
              id="hobby"
              name="hobby"
              className="w-full transform motion-safe:focus:scale-110  px-4 py-3 text-sm bg-white border border-gray-300 rounded-xl shadow-sm focus:border-grey-200 focus:shadow-md transition-all duration-200 hover:shadow-lg"
              placeholder="hobby"
              required
              value={state.hobby}
              onChange={handleChange}
            />
            <input
              name="location"
              type="text"
              id="location"
              required
              className="w-full transform motion-safe:focus:scale-110 px-4 py-3 mt-2 text-sm bg-white border border-gray-300 rounded-xl shadow-sm   focus:border-grey-200 focus:shadow-md transition-all duration-200 hover:shadow-lg"
              placeholder="Enter Location"
              value={state.location}
              onChange={handleChange}
            />

            <button
              disabled={isProcessing}
              className="ml-1.5 mt-2 w-60 px-3 py-2 rounded-lg text-white text-sm font-semibold transition duration-300 ease-out transform 
                     bg-linear-to-br from-gray-600 to-gray-800 shadow-md shadow-gray-600/50 
                     hover:scale-[1.05] hover:shadow-lg hover:from-gray-700 hover:to-gray-900 active:scale-[0.98] focus:ring-2 focus:ring-gray-700">
              {!isProcessing ? "Add Todo" :<Spin />}</button>
          </Card>
        </div>
      </div></form>
  );
};

export default Hero;
