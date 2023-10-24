import React, { useContext, useEffect, useState } from 'react'
import LoginHeader from '../Login/LoginHeader'
import Footer from '../Footer/Footer'
import { userContext } from '../../Context/UserContext';
import axios from 'axios';
import './Answer.css'
import { Link,  useNavigate} from 'react-router-dom';
import PersonIcon from "@mui/icons-material/PersonOutline";
import Question from './../Question/Question';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
function Answer ( { logout } )
{
  let userId = localStorage.getItem( "user_id" );
  userId = parseInt( userId );
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(userContext);
  const [userAndQuestion, setUserAndQuestion] = useState({});
  const [answers, setAnswer] = useState([]);
  const [displayAnswer, setDisplayAnswer] = useState(false); 
  const [form, setForm] = useState({});
  const [ tester, setTester ] = useState( false );

  let questionId = localStorage.getItem( "question_id" );
  questionId = parseInt( questionId );
  //The token attache to the URL, found below is used for authentication
  useEffect(() => {
  axios(`http://localhost:5000/api/users/getQuestions/${localStorage.getItem("auth-token")}`)
      .then( ( products ) =>
      {

        console.log(products.data.data)
        let filteredQuestion = products.data.data.filter( ( question =>
        {
        return (question.question_id === questionId);
        } ) )
        console.log(filteredQuestion)
        setUserAndQuestion(() => filteredQuestion);
        console.log( "get question page " )
        console.log(products.data)
        //  console.log(products.data);
      })
      .catch((error) => {
        console.log("Error is happen" + error);
      });
  }, []);

    useEffect( () =>
    {
      console.log( "yesss" )
      console.log(localStorage.getItem("question_id"));
    fetch(`http://localhost:5000/api/users/getAnswer/${localStorage.getItem("auth-token")}`)
      .then((res) => res.json())
      .then( ( products ) =>
      
      {
        console.log("below is answersss")
        console.log(products.data)
        setAnswer( () =>
        {
        return  products.data.filter( ( uniquAnswe ) =>
          {
          return uniquAnswe.question_id === questionId;
          })
        } );
        setDisplayAnswer( true );
        console.log("inside answer page") 
        console.log( products.data );
      })
      .catch((error) => {
        console.log("Error is happen" + error);
      });
  }, [tester]);

console.log(answers)

  const handleChange = (e) => {
    e.preventDefault();
    setForm((earlier) => {
      return { ...earlier, [e.target.name]: [e.target.value] };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   document.getElementById("textArea").focus();
    if ( form.answer && localStorage.getItem( "user_id" ) && localStorage.getItem( "question_id" ) )
    {
      try {
        axios
          .post(`http://localhost:5000/api/users/answer/${localStorage.getItem("auth-token")}`, {
            answer: form.answer,
            user: localStorage.getItem("user_id"),
            questionId: localStorage.getItem("question_id")
          })
          .then( ( response ) =>
          {
            if ( tester )
            {
              setTester( false );
            }
            else
            {
              setTester(true)
            }
            document.getElementById("answerForm").reset();
          });
      } catch (err) {
        console.log("Error from PostAnswer");
        console.log(err);
     
      }    
    }

  };

  //The useEffect function below is used to display login page if a user refreshes the current page. you can also use  userData.user
  useEffect(() => {
    if (!localStorage.getItem("auth-token")) navigate("/login");
  } );
  
  useEffect( () =>
  {
    document.getElementById("textArea").focus();
  }, [])
  
  const deleteAnswer = ( answer_id, answerUserId ) =>
      {
    if ( userId === answerUserId )
    {
      console.log("yes yeraseh answer nw")
      fetch( `http://localhost:5000/api/users/deleteAnswer/${ answer_id }` )
        .then( res => res.json() )
        .then( response =>
        {
            console.log( response )
            window.location.reload(false);
          }
          )
    }
    else
    {
      console.log("No yante answer adelem")
    }
      } 
  const editAnswer = ( answer_id ) =>
  {
    localStorage.setItem( "answer_id", answer_id )
    console.log( answer_id );
    console.log("user_id "+ userId)
}



  return (
    <div>
      <LoginHeader logout={logout} />
      <div className="answerPage">
        <div className="question">
          <div className='correctMargin'>
            <h1 className="correctWeight">Question?</h1>
            <h2 className='questionandAnaswer'> {userAndQuestion[0]?.question} </h2>
            <ul className='questionDescription'>{userAndQuestion[0]?.question_description} </ul>
          </div>
        </div>
        <div className="communityAnswer">
          <div className="h1">
            <h1 className="correctWeight">Answer From The Community</h1>
          </div>
          {displayAnswer
            ? answers?.map((answer) => {
                return (
                  <div className="userAndAnswer">
                    <div className="user">
                      <PersonIcon color="disabled" sx={{ fontSize: 100 }} />
                      <h5 className="userandquestion__email">
                        {answer.user_email}
                      </h5>
                      <div className="arrowForward"></div>
                    </div>
                    <div className="userAndAnswer_answer">
                      <h3 className="answers"> {answer?.answer} </h3>
                    </div>
                    <div className="userAndAnswer_icons">
                      <div
                        className="userAndAnswer_Delete"
                        onClick={() =>
                          deleteAnswer(answer.answer_id, answer.user_id)
                        }
                      >
                        {answer.user_id === userId ? (
                          <DeleteIcon sx={{ color: "#222" }} />
                        ) : (
                          <div className="userAndAnswer_Delete_arrow">
                            {" "}
                            <ArrowForwardIosIcon />
                          </div>
                        )}
                      </div>
                      <Link to={answer.user_id === userId && `/editAnswer`}>
                        <div
                          className="userAndAnswer_Edit"
                          onClick={() => editAnswer(answer.answer_id)}
                        >
                          {answer.user_id === userId && (
                            <EditIcon sx={{ color: "#222" }} />
                          )}
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>

        <div className="answerPage_question">
          <h1 className="correctWeight">Answer The Top Questions</h1>
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <ul>Go to Question Page</ul>
          </Link>
        </div>
        <form onSubmit={handleSubmit} id="answerForm">
          <textarea
            className="enterAnswe"
            type="text"
            name="answer"
            id="textArea"
            onChange={handleChange}
            placeholder="Your Answer..."
          />
          <button className="postAnswer">Post Your Answer</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Answer
