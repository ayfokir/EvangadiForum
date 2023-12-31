import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Signup.css'
import OnlyLogin from '../Login/OnlyLogin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/UserContext';
function Signup ()
{
  let navigate = useNavigate();
  const [userData, setUserData] = useContext(userContext);
  const [ value, setValue ] = useState( false );
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: [e.target.value] });
  };
  const signin = (e) => {
    if (value) {
      setValue(false);
    } else setValue(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try
    {
       document.getElementById("email").focus();
      
      if ( form.email && form.firstName && form.lastName && form.password && form.userName )
      {
        
        //sending user data to the database to be logged in
        axios
          .post("http://localhost:5000/api/users", {
            firstName: form.firstName,
            lastName: form.lastName,
            userName: form.userName,
            email: form.email,
            password: form.password
          })
          .then((response) => {
            //update global state with response from backend(user-info)
            console.log("i am inside sign up")
            console.log( response.data );
               setUserData( (earlier) =>  {
                 // be axios return yetedergew value yemekemetew data wust new that is why i say:  loginRes.data.token
                 console.log( response.data.user);
                 return {
                   ...earlier,
                  token:response.data.token,
                  user: response.data.user}
               } );
                localStorage.setItem( "auth-token", response.data.token );
                localStorage.setItem("user_name", response.data.user.user_name);
                localStorage.setItem( "user_id", response.data.user.user_id );
             // this is replace the useEffect function below use either of them. 
          });
      }
      }
    catch ( err )
    {
      console.log("problem is happen");
      console.log(err);
    }
  };

    useEffect( () =>  
    {
      if ( localStorage.getItem( "auth-token" ) ) navigate( "/" );
      console.log("not have token")
    }  ) // you can remove navigate here
      


  useEffect( () =>
  {
    document.getElementById("email").focus();
 }, [])
  
  return (
    <>
      {value ? (
        <OnlyLogin />
      ) : (
        <div className="signupPage">
          <div>
            <h1 className='joinNetwork'>Join The Network</h1>
            <h3>
              Already Have an Account? <Link onClick={signin} className="changeColor">Sign in</Link>
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="signupPage__userData">
              <input
                className="email "
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>

            <div className="signupPage__userData firstNameAndLastName">
              <input
                className=" firstName"
                type="text"
                name="firstName"
                placeholder="FirstName"
                onChange={handleChange}
              />
              <input
                className=" lastName "
                type="text"
                name="lastName"
                placeholder="LastName"
                onChange={handleChange}
              />
            </div>
            <div className="signupPage__userData">
              <input
                className=" userName"
                type="text"
                name="userName"
                placeholder="UserName"
                onChange={handleChange}
              />
            </div>
            <div className="signupPage__userData">
              <input
                className="password"
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
              />
            </div>
            <button className="agreeandJoin">Agree and Join</button>
          </form>

          <p>
            I agree to the <Link className="changeColor">Privacy Policy</Link>{" "}
            and <Link className="changeColor">terms of Service</Link>{" "}
          </p>

          <Link className="changeColor"> Already Have an Account</Link>
        </div>
      )}
    </>
  );
}

export default Signup
