import React  from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './Home'
import Footer from '../Frontend/Components/Footer/footer'
function index() {
  return (
    <>
    <Routes>
        <Route path ="/" element ={<Home/>} />
        
    </Routes>
    <Footer/>
    </>
  )
}
export default index;
