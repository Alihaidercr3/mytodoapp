import React, { useState ,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Space,Spin  } from 'antd';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth ,firestore } from '../../config/firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { AuthContext } from '../../context/AuthContext';



const initialState = { email: "", password: "" };

const Register = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const [processing, setProcessing] = useState(false);
const {dispatch}= useContext(AuthContext)
  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }));
  }

  const handleRegister = (e) => {
    e.preventDefault();
    const { email, password } = state;
    setProcessing(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setState({ email: "", password: "" });
        addDocument(user);
        navigate("/")
        console.log("user created");
         
      })
      .catch(err => {
        console.error(err);
         setProcessing(false);
      })  
  }
  const addDocument = async(user)=>{
      try {
        
        await setDoc(doc(firestore, "users", user.uid), {
 uid : user.uid
});
dispatch({type:"LOGIN"})
console.log("user doc created");

      } catch (error) {
       console.log(error) 
      }
setProcessing(false)


    
  
       
 }

  return (
    <div className="mt-20 flex justify-center">
      <Space>
        <Card
          title={<h1 className="text-2xl font-bold text-gray-800 text-center cursor-default">Register</h1>}
          style={{ width: 400 }}
          className="rounded-2xl shadow-2xl"
        >
          <form className="space-y-7" onSubmit={handleRegister}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-grey-200 focus:border-grey-200 focus:shadow-md transition-all duration-200 hover:shadow-lg"
                placeholder="name@example.com"
                required
                value={state.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-grey-200 focus:border-grey-200 focus:shadow-md transition-all duration-200 hover:shadow-lg"
                placeholder="••••••••"
                required
                value={state.password}
                onChange={handleChange}
              />
            </div>

            <p className='font-normal cursor-default'>
              Already have an account? <Link to="/authentication/login"><span>Login</span></Link>
            </p>

            <button
              type="submit"
              disabled={processing}
              className="ml-2.5 w-80 px-3 py-2 rounded-lg text-white text-sm font-semibold transition duration-300 ease-out transform 
                    bg-linear-to-br from-gray-600 to-gray-800 shadow-md shadow-gray-600/50 
                     hover:scale-[1.05] hover:shadow-lg hover:from-gray-700 hover:to-gray-900 active:scale-[0.98] focus:ring-2 focus:ring-gray-700"
            >
              {processing ? <Spin/> : "Register"}
            </button>
          </form>
        </Card>
      </Space>
    </div>
  )
}

export default Register;
