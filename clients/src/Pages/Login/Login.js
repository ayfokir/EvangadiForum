import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../Context/UserContext'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'
import LoginHeader from './LoginHeader';
import Signup from '../Signup/Signup';

function Login ({signIn})
{

    const [ userData, setUserData ] = useContext( userContext );
    const navigate = useNavigate();
    const [ form, setForm ] = useState( {} );

    const handleChange = ( e ) =>
    {
      setForm( { ...form, [ e.target.name ]: [ e.target.value ] } )
      setUserData({...userData, email: form.email}) // user login siaderg emalun felegew new data layer lay user "/answer" router lay display saderg silemefelgew
  }
  // console.log( userData );
    const handleSubmit =  ( e ) =>
    { e.preventDefault();
        try
        {
          //sending user data to the database to be logged in  
    axios.post(
              "http://localhost:5000/api/users/login",
              {
                email: form.email,
                password: form.password
              }  
            ).then( response => {
              //update global state with response from backend(user-info)
              setUserData( (earlier) =>  {
                // be axios return yetedergew value yemekemetew data wust new that is why i say:  loginRes.data.token
            return   { ...earlier,
                token: response.data.token,
                user: response.data.user}
              });
              //set localStorage with the token
              localStorage.setItem("auth-token", response.data.token);
              //navigate user to homepage
                
            //   navigate("/"); // this is replace the useEffect function below use either of them.
            })
        }  
        
        catch ( err )
        {
            // console.log( "problem", err.response.data.msg )
            console.log( "problem is happen" )
            console.log(err)
            // alert(err.response.data.msg)    
        }
  } 
    const creatAccount = () =>
    {
        if ( userData.value1 )
        {
          setUserData((earlier) => {
            return { ...earlier, value1: false };
          });
          setUserData((earlier) => {
            return { ...earlier, value2: false };
          });
        }  
        else
        {
          setUserData((earlier) => {
            return { ...earlier, value1: true };
          });
          setUserData((earlier) => {
            return { ...earlier, value2: true };
          });
          
        }  
  }

    useEffect( () =>  
    {
        if ( userData.user ) navigate( '/' );
    }, [ userData.user, navigate ] ) // you can remove navigate here
    
    return (  
      <>  
        <LoginHeader signIn={signIn} />
        <div className="superParent">
          {userData.value1 && userData.value2 ? (
            <Signup />
          ) : (
            <div className="superParent__signinPage" id="signinPage">
              <h1>Login to Your Account</h1>
              <h3>
                Don't Have an Account ? &nbsp;
                <Link onClick={creatAccount}>Create a new account</Link>
              </h3>
              <form onSubmit={handleSubmit}>
                <input
                  placeholder="Your Email"
                    className="emailInput"
                    id='email'
                  type="text"
                  name="email"
                  onChange={handleChange}
                />
                <br />
                <input
                  className="passwordInput"
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  onChange={handleChange}
                />
                <br />
                <button className="superParent__signinPage__marginTop">
                  Submit
                </button>
              </form>
              <Link onClick={creatAccount}>Create a new account</Link>
            </div>
          )}

          <div className="superParent__description">
            <h3>About</h3>
            <h1>Evangadi Networks Q&A</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              aperiam error autem? Optio delectus possimus quaerat beatae sint
              iure porro, autem, deserunt, commodi incidunt nemo iusto. Itaque
              laudantium inventore libero vero cumque ipsam. Iusto fuga minima
              obcaecati ducimus soluta dignissimos
            </p>

            <p>
              assumenda, consequatur maxime corporis aliquam temporibus nam,
              fugit possimus porro quas vero optio rerum molestias suscipit
              expedita harum delectus architecto consequuntur in. Porro fuga
              pariatur, perferendis explicabo eaque, ex iste quis repudiandae
              dolorem ducimus distinctio, harum molestiae hic provident natus.
            </p>
            <button className="superParent__description__button">
              How it Works
            </button>
          </div>
        </div>
      </>
    );
            
}

export default Login


