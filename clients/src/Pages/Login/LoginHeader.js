import React, { useContext, useState } from 'react'
import './LoginHeader.css'
import logo from './evangadiForum.png'  
import { Link } from 'react-router-dom'
import { userContext } from '../../Context/UserContext';
function LoginHeader({ signIn, logout }) {
 const [userData, setUserData] = useContext(userContext);  
  return (  
    <div className="header">
      <Link to = {"/"}><img src={logo} /></Link>
      <div className="header__signin">     
        <Link to = {"/"} style={{textDecoration: "none", color: "black"}}  >
          <h3 >Home</h3>  
        </Link>   
        <h3>How it Works</h3>
        {/* <Link  onClick= {signIn } >  
          <button  onClick={logout} className="header__signin__button"> {userData.user ? "Log Out" : "SIGN IN"  } </button>
        </Link> */} 
        <div>

         { userData.user ?   <Link to = {"/login"} ><button onClick= { logout } className="header__signin__button"> Log Out </button> </Link>   :
             <button  onClick= { signIn } className="header__signin__button"> Sign In </button>   }
          
          </div>
      </div> 
    </div>
  );
}

export default LoginHeader
