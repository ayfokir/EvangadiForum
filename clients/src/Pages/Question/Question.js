import React, { useContext, useState } from 'react'
import './Question.css'
import axios from 'axios'
import { userContext } from '../../Context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
function Question ()
{ 
  const [ userData, setUserData ] = useContext( userContext );
  const navigate = useNavigate();
  const [form, setForm] = useState({
    myQuestion: "",
    question_description: ""
  } );
  const handleChange = (e) =>
  {
    setForm({ ...form, [e.target.name]: [e.target.value] });
  }
  const handleSubmit = (e) =>  
  {
    e.preventDefault();  
      try
      {
        console.log( form )
        console.log("hi man inside submit")
          //sending user data to the database to be logged in  
    axios
      .post("http://localhost:5000/api/users/question", {
        myQuestion: form.myQuestion,
        question_description: form.question_description,
        user: userData.user
      })
      .then( ( response ) =>
      {
        navigate("/")
        console.log( response );

      } );
      }  
        
        catch ( err )
        {
            // console.log( "problem", err.response.data.msg )
            console.log( "problem is happen" )
            console.log(err)
            // alert(err.response.data.msg)    
        }
  } 

  return (
    <div>
      <div className="questionPart">
        <h1>Steps to Write a good question</h1>
        <ul>
          <li>Summerize your Problem in one line title</li>
          <li>Descripe your problem in more detail</li>
          <li>Descripe what you tried and what you expected to happen</li>
          <li>Review your question and post it to the site</li>
        </ul>
        <h1>Ask Public Question</h1>
        <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
          <h4>Go to Question Page</h4>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="inputarea">
        <input
          className="inputarea__title"
          type="text"
          name="myQuestion"
          placeholder="Title"
          onChange={handleChange}
        />
        <textarea
          className="inputarea__description"
          type=" text"
          name="question_description"
          placeholder="Question Description"
          onChange={handleChange}
        />

        <button className="postQuestion">Post Your Question</button>
      </form>
    </div>
  );
}

export default Question
