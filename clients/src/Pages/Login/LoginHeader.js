import React, { useContext, useState } from 'react'
import './LoginHeader.css'
import logo from './evangadiForum.png'
import QandA from './Q and A.png'  

// import QandA from './QandA1.png'  
 
import { Link } from 'react-router-dom'
import { userContext } from '../../Context/UserContext';
function LoginHeader ( {  logout, focus } )
{
  let userId = localStorage.getItem( "user_id" );
  const [ userData, setUserData ] = useContext( userContext );  
  
    const signIn = () => {
      setUserData((earlier) => {
        return { ...earlier, value2: false };
      });
      setUserData((earlier) => {
        return { ...earlier, value1: false };
      });
    };
  return (  
    <div className= "header"   >
      <Link to={ "/" }><img className='header_headerimage' src={ logo } /></Link>
      {/* <h1>Q and A</h1> */}
      <div className="header__signin">     
        <Link to = {"/"} style={{textDecoration: "none", color: "black"}}  >
          <h3 >Home</h3>  
        </Link>         
        <h3>How it Works</h3>

        <div>
              { localStorage.getItem("auth-token") ?   <Link to = {"/login"} ><button onClick= { logout } className="header__signin__button"> Log Out </button> </Link>   :
            <button onClick={ () => { signIn(); focus()}} className="header__signin__button"> Sign In </button> }
        </div> 

      </div> 
    </div>
  );
}  

export default LoginHeader
