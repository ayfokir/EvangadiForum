import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../Context/UserContext'
import { Link, useNavigate } from 'react-router-dom';
import LoginHeader from '../Login/LoginHeader';
import './Home.css'
import Question from '../Question/Question';
import axios from 'axios';
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
function Home ({logout})
{


  let ayfo = "Ayfo";  
  const [userAndQuestion, setUserAndQuestion] = useState([]);
  let navigate = useNavigate();

  const [userData, setUserData] = useContext(userContext);
  // const userAndQuestion = () =>
  // {
  //    let  userAndQuestion = fetch("http://localhost:5000/api/users/getQuestions")
  //         .then( ( data ) =>
  //      {
  //       console.log(data)
  //      } )
  //      .catch( ( ex ) =>
  //      {
  //            return ex
  //          });
  //          return userAndQuestion;
  // }
  // userAndQuestion();

  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);
// console.log(userAndQuestion)
  useEffect(() => {
    fetch("http://localhost:5000/api/users/getQuestions")
      .then((res) => res.json())
      .then( ( products ) =>
      {
        
        setUserAndQuestion(() => products.data); 
        //  userAndQuestion = userAndQuestion.reverse();
      })
      .catch((error) => {
        console.log("Error is happen" + error);
      });
  }, [] );  


  // useEffect(() => {
  //   fetch("http://localhost:5000/api/users/all")
  //     .then((res) => res.json())
  //     .then( ( products ) =>
  //     {
  //       let value = products.data
  //       setUserData( ( earlier ) =>
  //       {
  //         return {
  //           ...earlier,
  //           AnswerUserId: value
  //         };
  //       });
  //     })
  //     // console.log( answers );  
  //     .catch((error) => {
  //       console.log("Error is happen" + error);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/users/getAnswer")
  //   .then((res) => res.json())
  //   .then( ( products ) =>
  //   {
  //     let value = products.data;
  //     setUserData( ( earlier ) =>
  //     {
  //       return {
  //         ...earlier,
  //         Answer: value,
  //       };
  //     })
  //   }
  //  )
  //     .catch((error) => {
  //       console.log("Error is happen" + error);
  //     });
  //   });
    
    
    //console.log(userData)
    
  const handleClick = ( id ) =>
  {
    console.log("hi from home.js")
    let filterQuestion = userAndQuestion.filter( (userAndQuestion) => userAndQuestion.question_id == id );
    console.log( filterQuestion );
    setUserData((earlier) => {  
      return {
        ...earlier,
        question: filterQuestion[0].question,
        question_description: filterQuestion[0].question_description,
        questionId: filterQuestion[ 0 ].question_id,
      };
    });
    console.log(userData);
  };
// console.log(userData)

  //onClick={ () => handleClick(emailAndQuestion?.user_id)}
  return (
    <div>
      <LoginHeader logout={logout} />
      {/* <button onClick={logout} > Log Out</button> */}

      <div className="homePage">
        <Link to={"/ask-questions"}>
          <button className="homePage__askquestion"> Ask Question</button>
        </Link>
        <h1> Welcome { userData.user?.display_name } </h1>
        {/* <h1> Welcome { userData?.email} </h1> */}
        
      </div>
      <div className="parent">
        <div>
          <h2>Questions</h2>
          <hr />
        </div>

        <div>
          {userAndQuestion.map((emailAndQuestion) => {
            return (
              <Link style={{ color: "black" }} to={"/answer"}     >
                <div className="userandquestion" onClick={ () => handleClick(emailAndQuestion?.question_id)}>
                  <div className="user">
                    <PersonIcon sx={{ fontSize: 100 }} />
                    <h5 className="userandquestion__email">
                      {emailAndQuestion?.user_email}
                    </h5>
                    <div className="arrowForward">
                      <ArrowForwardIosIcon />
                    </div>
                  </div>
                  <h3 className="userandquestion__question">
                    {" "}
                    {emailAndQuestion?.question}{" "}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}



export default Home





