import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Space,Spin } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
  

const initialState = { email: "", password: "" };

const Login = () => {
  const [state, setState] = useState(initialState);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }));
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = state;

    setProcessing(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;
      console.log("Logged in user:");
      console.log(user);
      
      navigate("/"); 
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="mt-20 flex justify-center">
      <Space>
        <Card
          title={<h1 className="text-2xl font-bold text-gray-800 text-center cursor-default">Login</h1>}
          style={{ width: 400 }}
          className="rounded-2xl shadow-2xl"
        >
          <form className="space-y-7" onSubmit={handleLogin}>
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

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <p className='font-normal cursor-default'>
              Don't have an account? <Link to="/authentication/register"><span className="text-blue-600">Register</span></Link>
            </p>

            <button
              type="submit"
              disabled={processing}
              className="ml-2.5 w-80 px-3 py-2 rounded-lg text-white text-sm font-semibold transition duration-300 ease-out transform 
                    bg-linear-to-br from-gray-600 to-gray-800 shadow-md shadow-gray-600/50 
                     hover:scale-[1.05] hover:shadow-lg hover:from-gray-700 hover:to-gray-900 active:scale-[0.98] focus:ring-2 focus:ring-gray-700"
            >
              {processing ?<Spin />: "Login"}
            </button>
          </form>
        </Card>
      </Space>
    </div>
  )
}

export default Login;
