import React, { useContext } from 'react'
import styles from "./NavBar.module.css"
import {Link, useNavigate} from 'react-router-dom';
import logo from "../../Assets/images/freshcart-logo.svg"

import { TokenContext } from '../../Context/Token';
import { CartContent } from '../../Context/Cartcontext';

export default function NavBar() {

 let {token,setToken} =useContext(TokenContext)
 let navigate = useNavigate()
 let{numOfCartItems}=useContext(CartContent)

function logOut(){
  localStorage.removeItem("userToken")
  setToken(null);
  navigate("/login")
}



  return (
    <div className={`${styles.NavBar}`}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div className="container">
    <Link className="navbar-brand" to={'home'}> <img src={logo} alt='' /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     
     {token ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to={'home'}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'cart'}>Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'productes'}>products</Link>
        </li>  
         <li className="nav-item">
          <Link className="nav-link" to={'categories'}>Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'brands'}>Brands</Link>
        </li>
      </ul> : null }
      


      <ul className='navbar-nav ms-auto'>

      <li className="nav-item align-self-center">
        <i className='fa-brands fa-instagram mx-1'></i>
        <i className='fa-brands fa-facebook mx-1'></i>
        <i className='fa-brands fa-twitter mx-1'></i>
        <i className='fa-brands fa-linkedin mx-1'></i>
        <i className='fa-brands mx-1 fa-youtube'></i>
        <i className='fa-brands mx-1 fa-tiktok'></i>
        </li>
        {token ?<><li className="nav-item">
          <button className="nav-link " onClick={logOut}>Logout</button>
        </li> 
        <li className="nav-item position-relative">
          <Link className="nav-link" to={'cart'}>
            <i className=' fa fa-shopping-cart text-main pe-2'></i>
            <span className=' bg-main text-white p-1 rounded position-absolute top-0 end-0'>{numOfCartItems}</span>
            </Link>
        </li>
        </> : <>
         <li className="nav-item">
          <Link className="nav-link " aria-current="page" to={'register'}>Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to={'login'}>Login</Link>
        </li>
        </> }
     
       
      </ul>
     
    </div>
  </div>
</nav>
    </div>
  )
}
