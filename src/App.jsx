import './App.css'
import AuthContextProvider, { AuthContext } from './context/AuthContext'
import Routes from "./pages/Routes"



function App() {
  return(<AuthContextProvider>
  <Routes />
  </AuthContextProvider>)

}

export default App
