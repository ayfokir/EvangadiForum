import React, { useEffect, useState } from "react";
import LoginHeader from "../Login/LoginHeader";

import Footer from "../Footer/Footer";
import Question from './../Question/Question';
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Questions({ logout }) {
    // console.log( "hi man" );
    // let navigate = useNavigate();
    // const [userAndQuestions, setUserAndQuestion] = useState([]);
    // let questionId = localStorage.getItem( "question_id" );
    // questionId = parseInt( questionId );
    // let userId = localStorage.getItem( "user_id" );
    // userId = parseInt( userId );

    //  useEffect(() => {
    // fetch(`http://localhost:5000/api/users/getQuestions/${localStorage.getItem("auth-token")}`)
    //     .then((res) => res.json())
    //     .then( ( products ) =>
    //     {
    //         let userAndQuestion = products.data;
    //         console.log( userAndQuestion );
    //         let result = userAndQuestion.filter( question => question.question_id === questionId )
    //         console.log(result)
    //         setUserAndQuestion( () =>  result);
    //         //  if (result[0]?.user_id != userId) {
    //         //    navigate("/");
    //         //  }
    //     })
    //     .catch((error) => {
    //     console.log("Error is happen Here" + error);
    //     });
    // }, []);


  return (
    <>
      <LoginHeader logout={logout} />
      <div>
        <Question value = {false} />
      </div>
      <Footer />
    </>
  );
}

export default Questions;
