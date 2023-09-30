import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { userContext } from '../../Context/UserContext';
import Signup from '../Signup/Signup';
function OnlyLogin ()

{
    const [userData, setUserData] = useContext(userContext);
    const [ value, setValue ] = useState( false );
     const [form, setForm] = useState({});
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: [e.target.value] });
    };
        const creatAccount = () => {
          if (value) {
            setValue(false);
          } else setValue(true);
    };
    
         const handleSubmit = (e) => {
         e.preventDefault();
           try
           {
              document.getElementById("email").focus();
             if ( form.email && form.password ) // to handle error when the user sign in with empty password and email.
             {
             
               axios
                  .post("http://localhost:5000/api/users/login", {
                   email: form.email,
                   password: form.password
                  })
                 .then((response) => {
                   //update global state with response from backend(user-info)
                   setUserData({
                     // be axios return yetedergew value yemekemetew data wust new that is why i say:  loginRes.data.token
                     token: response.data.token,
                     user: response.data.user
                   });
                   //set localStorage with the token
                   localStorage.setItem("auth-token", response.data.token);
                 });
           }
         } catch (err) {
           console.log("problem is happen");
           console.log(err);
         }
  }; 
  
  useEffect(() => {
    document.getElementById("email").focus();
  }, []);

    return (
      <>
            { value ? <Signup /> :
                <div className="superParent__signinPage" id="signinPage">
                    <h1>Login to Your Account</h1>
                    <h3>
                        Don't Have an Account ? &nbsp;
                        <Link onClick={ creatAccount }>Create a new account</Link>
                    </h3>
                    <form onSubmit={ handleSubmit }>
                        <input
                            placeholder="Your Email"  
                            className="emailInput"
                            type="text"
                            id='email'
                            name="email"
                            onChange={ handleChange }
                        />
                        <br />  
                        <input
                            className="passwordInput"
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            onChange={ handleChange }
                        />
                        <br />
                        <button className="superParent__signinPage__marginTop">
                            Submit
                        </button>
                    </form>
                    <Link onClick={ creatAccount }>Create a new account</Link>
                </div>
            
            }
      </>
    );
}

export default OnlyLogin
