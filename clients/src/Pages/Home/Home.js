import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../Context/UserContext'
import { Link, useNavigate } from 'react-router-dom';
import LoginHeader from '../Login/LoginHeader';
import './Home.css'
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import PersonIcon from "@mui/icons-material/Person";
import PersonIcon from "@mui/icons-material/PersonOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from '@mui/material';
function Home ({logout})
{
  
  
  const [userAndQuestion, setUserAndQuestion] = useState([]);
  let navigate = useNavigate();
  let userId = localStorage.getItem( "user_id" );
  userId = parseInt( userId );
  const [userData, setUserData] = useContext(userContext);

  //The useEffect function below is used to display login page if a user refreshes the current page. you can also use  userData.user
  //when the page is refresh the token is undefined, using the data layer.
  useEffect(() => {
    if ( !localStorage.getItem( "auth-token" ) ) navigate( "/login" );
    console.log("yesffffffff")
  });  
  
  useEffect(() => {
    fetch(`http://localhost:5000/api/users/getQuestions/${localStorage.getItem("auth-token")}`)
      .then((res) => res.json())
      .then( ( products ) =>
      {
        console.log(products.data)
        setUserAndQuestion(() => products.data);
        //  userAndQuestion = userAndQuestion.reverse();
      })
      .catch((error) => {
        console.log("Error is happen Here" + error);
      });
  }, []);
  
  const handleClick = (id) => {
    console.log("hi from handle Click");
    let filterQuestion = userAndQuestion.filter(
      (userAndQuestion) => userAndQuestion.question_id == id
    );
    localStorage.setItem( "question_id", filterQuestion[ 0 ].question_id );
  
    // setUserData((earlier) => {
    //   // localStorage.setItem( "question_description",  filterQuestion[ 0 ].question_description );
    //   // localStorage.setItem("question", filterQuestion[0].question);  
    //   return {
    //     ...earlier,
    //     question: filterQuestion[0].question,
    //     question_description: filterQuestion[ 0 ].question_description,
    //     questionId: filterQuestion[0].question_id
    //   };
    // });
  };
  
 
  const deleteQuestion = ( question_id ) =>
  {
        let userId = localStorage.getItem("user_id");
        userId = parseInt(userId);
    console.log(question_id)
    let deletedQuestion = userAndQuestion.filter( question =>
    {
  return question.question_id === question_id;
    } )  
    console.log(deletedQuestion)    
    if ( deletedQuestion[0]?.user_id === userId )  
    {
      fetch(`http://localhost:5000/api/users/deleteQuestion/${question_id}`)
        .then((res) => res.json())
        .then((res) => console.log(res));
        window.location.reload(false);
    }  
    console.log("Question Deleted ")
  }


  return (
    <div>
      <LoginHeader logout={logout} />
      <div className="homePage">
        <Link to={"/ask-questions"}>
          <button className="homePage__askquestion"> Ask Question</button>
        </Link>
        <h1 className='welcome'> Welcome : {localStorage.getItem("user_name")} </h1>
      </div>
      <div className="parent">
        <div className="parent_question">
          <h2 className='questions'>Questions</h2>
        </div>
        <div>
          {userAndQuestion?.map((emailAndQuestion) => {
            return (
              <div>
                <div
                  className="userandquestion"
                  onClick={() => handleClick(emailAndQuestion?.question_id)}
                >
                  <div className="user">
                    <PersonIcon color="disabled" sx={{ fontSize: 100 }} />
                    <h5 className="userandquestion__email">
                      {emailAndQuestion?.user_email}
                    </h5>
                    <div className="arrowForward">
                      <div
                        className="delete"
                        onClick={() =>
                          deleteQuestion(emailAndQuestion?.question_id)
                        }
                      >
                        {emailAndQuestion.user_id === userId ? (
                          <IconButton>
                            {" "}
                            <DeleteIcon sx={{ color: "#222" }} />
                          </IconButton>
                        ) : (
                          <div className="arrowForward_child">
                            {" "}
                            <ArrowForwardIosIcon />{" "}
                          </div>
                        )}
                      </div>
                      <Link to={emailAndQuestion.user_id === userId && `/edit`}>
                        <div className="edit">
                          {emailAndQuestion.user_id === userId ? (
                            <IconButton>
                              <EditIcon sx={{ color: "#222" }} />
                            </IconButton>
                          ) : (
                            ""
                          )}
                        </div>
                      </Link>
                    </div>
                  </div>
                  <Link style={{ color: "black" }} to={"/answer"}>
                    <h3 className="userandquestion__question">
                      {emailAndQuestion?.question}
                    </h3>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}





export default Home





