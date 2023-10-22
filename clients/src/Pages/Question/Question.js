import React, { useContext, useEffect, useState } from 'react'
import './Question.css'
import axios from 'axios'
import { userContext } from '../../Context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
function Question ({value})
{ 
    
    let questionId = localStorage.getItem("question_id");
    console.log(questionId);
  console.log(value)
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
    document.getElementById("textArea").focus();
    if ( form.myQuestion || form.question_description) 
    {
      if ( value && localStorage.getItem( "user_id" ) )
      {
        try
        {
          console.log( form )  
          console.log("hi man inside submit")  
      axios
        .post(`http://localhost:5000/api/users/question/${localStorage.getItem("auth-token")}`, {
          myQuestion: form.myQuestion,
          question_description: form.question_description,
          user: localStorage.getItem( "user_id" ),
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
    } 
    // below is used to edit Question
    
      if ( form.myQuestion || form.question_description )
      {
        if ( !value && localStorage.getItem( "question_id" ) )
        {
        try
        {
          console.log( form )  
          console.log("hi man inside submit")  
      axios
        .post(`http://localhost:5000/api/users/editQuestion/${localStorage.getItem("auth-token")}`, {
          myQuestion: form.myQuestion,
          question_description: form.question_description,
          user: localStorage.getItem( "user_id" ),
          questionId: localStorage.getItem("question_id")
        })
        .then( ( response ) =>
        {
          console.log("see updated response ")
        console.log(response)
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
    }  
    }  
  useEffect(() => {
    if (!localStorage.getItem("auth-token")) navigate("/login");
  });

useEffect(() => {
  document.getElementById("textArea").focus();
}, []);

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
         {value ? <h1>Ask Public Question </h1> :  <h1>Edit Your Question </h1> }
        <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
          <h4>Go to Question Page</h4>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="inputarea" id="questionForm">
        <input
          className="inputarea__title"
          type="text"
          name="myQuestion"
          placeholder="Title"
          id="textArea"
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
