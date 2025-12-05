import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../../config/firebase";


const Navbar = () => {
  const navigate = useNavigate();
  const { isAuth, dispatch } = useContext(AuthContext);
  
  console.log(isAuth);
  



  const handlelogout =  async() => {
  await signOut(auth);
  try {
    dispatch({type:"LOGOUT"})
    navigate("/")
  } catch (error) {
    console.log(error);
    
  }
  }
  return (
    <nav className="fixed w-full z-20 top-0 left-0 border-b border-gray-200 bg-white">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-7 hover:animate-spin"
            alt="Logo"
          />
          <span className="text-xl font-semibold whitespace-nowrap animate-pulse">TodoApp</span>
        </Link>

        <div className="flex md:order-2 space-x-3">
          <form >
            {!isAuth ? <button onClick={()=>navigate("/authentication/login")} className="text-white bg-linear-to-r from-[#274046] to-[#E6DADA] hover:from-purpl-e300 hover:to-purple-500 transform motion-safe:hover:scale-110 transition ease-in-out duration-700 font-medium rounded-lg text-sm px-4 py-2">
              Login
            </button > : <> <button onClick={()=>navigate("/dashboard")} className="text-white bg-linear-to-r from-[#274046] to-[#E6DADA] hover:from-purpl-e300 hover:to-purple-500 transform motion-safe:hover:scale-110 transition ease-in-out duration-700 font-medium rounded-lg text-sm px-4 py-2 mr-5">
              dashboard </button>
              <button className="text-white bg-linear-to-r from-[#274046] to-[#E6DADA] hover:from-purpl-e300 hover:to-purple-500 transform motion-safe:hover:scale-110 transition ease-in-out duration-700 font-medium rounded-lg text-sm px-4 py-2 " onClick={handlelogout}>
                Logout</button></>
            }
          </form>

          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 border  border-gray-200 rounded-lg bg-gray-50 md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <Link
                to="/"
                className="transform motion-safe:hover:scale-110 transition ease-in-out duration-700  block py-2 px-3 text-white bg-blue-600 hover:underline rounded md:bg-transparent md:text-gray-700 md:p-0 md:hover:text-blue-600 "
                aria-current="page"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/todos"
                className="transform motion-safe:hover:scale-110 transition ease-in-out duration-700  block py-2 px-3 text-gray-700 rounded hover:underline hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0"
              >
                Todos
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="transform motion-safe:hover:scale-110 transition ease-in-out duration-700  block py-2 px-3 text-gray-700 rounded hover:underline hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="transform motion-safe:hover:scale-110 transition ease-in-out duration-700  block py-2 px-3 text-gray-700 rounded hover:underline hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


