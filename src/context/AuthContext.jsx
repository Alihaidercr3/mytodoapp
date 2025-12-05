import React, { createContext, useEffect, useReducer, useState } from "react"
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext()

const intialState = { isAuth: false, user: {}}
// const reducer = ((state, action) => {
  
//   switch (action.type) {
//     case "LOGIN":
//       return { isAuthenticated: true }
//     case "LOGOUT":
//       return { isAuthenticated: false }
//     default:
//       return state;
//   }
// })
export default function AuthContextProvider(props) {
  // const [state, dispatch] = useReducer(reducer, intialState)
  const [state, dispatch] = useState(intialState)
  
    useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {

        const uid = user.uid;
        console.log("User is Signed In");
        dispatch({isAuth: true, user})
      } else {
        console.log("User is Signed Out");
        dispatch({isAuth:false})
      }
    })
  },[])

  return (
    <AuthContext.Provider value={{...state, dispatch  }}>
      {props.children}
    </AuthContext.Provider>
  )
}
