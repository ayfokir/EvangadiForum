import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../Context/UserContext'
import { Link, useNavigate } from 'react-router-dom';
import LoginHeader from '../Login/LoginHeader';
import './Home.css'
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
function Home ({logout})
{
  const [userAndQuestion, setUserAndQuestion] = useState([]);
  let navigate = useNavigate();

  const [userData, setUserData] = useContext(userContext);

  //The useEffect function below is used to display login page if a user refreshes the current page. you can also use  userData.user
  //when the page is refresh the token is undefined, using the data layer.
  useEffect(() => {
    if (!userData.token) navigate("/login");
  }, [userData.token, navigate]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/getQuestions/${userData.token}`)
      .then((res) => res.json())
      .then((products) => {
        setUserAndQuestion(() => products.data);
        //  userAndQuestion = userAndQuestion.reverse();
      })
      .catch((error) => {
        console.log("Error is happen" + error);
      });
  }, []);

  const handleClick = (id) => {
    console.log("hi from home.js");
    let filterQuestion = userAndQuestion.filter(
      (userAndQuestion) => userAndQuestion.question_id == id
    );
    console.log(filterQuestion);
    setUserData((earlier) => {
      return {
        ...earlier,
        question: filterQuestion[0].question,
        question_description: filterQuestion[0].question_description,
        questionId: filterQuestion[0].question_id
      };
    });
    console.log(userData);
  };

  return (
    <div>
      <LoginHeader logout={logout} />

      <div className="homePage">
        <Link to={"/ask-questions"}>
          <button className="homePage__askquestion"> Ask Question</button>
        </Link>
        <h1> Welcome {userData.user?.user_name} </h1>
      </div>
      <div className="parent">
        <div>
          <h2>Questions</h2>
          <hr />
        </div>

        <div>
          {userAndQuestion?.map((emailAndQuestion) => {
            return (
              <Link style={{ color: "black" }} to={"/answer"}>
                <div
                  className="userandquestion"
                  onClick={() => handleClick(emailAndQuestion?.question_id)}
                >
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
                    {emailAndQuestion?.question}
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





