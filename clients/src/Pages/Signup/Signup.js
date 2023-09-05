import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Signup.css'
import OnlyLogin from '../Login/OnlyLogin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Signup ()
{
  let navigate = useNavigate();
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
    try {
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
          console.log(response);
        
          if ( response )
          {
            navigate("/"); // this is replace the useEffect function below use either of them.
            
          }
        });
    } catch (err) {
      // console.log( "problem", err.response.data.msg )
      console.log("problem is happen");
      console.log(err);
      // alert(err.response.data.msg)
    }
  };
  return (
    <>
      {value ? (
        <OnlyLogin />
      ) : (
        <div className="signupPage">
          <div>
            <h1>Join The Network</h1>
            <h3>
              Already Have an Account? <Link onClick={signin}>Sign in</Link>
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="signupPage__userData">
              <input
                className="email "
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>

            <div className="signupPage__userData">
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
                  className='password'
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
              />
            </div>
            <button className="agreeandJoin">Agree and Join</button>
          </form>

          <p>
            I agree to the <Link>Privacy Policy</Link> and{" "}
            <Link>terms of Service</Link>{" "}
          </p>

          <Link> Already Have an Account</Link>
        </div>
      )}
    </>
  );
}

export default Signup
