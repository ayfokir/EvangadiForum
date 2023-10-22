import React, { useContext, useEffect, useState } from 'react'
import LoginHeader from '../Login/LoginHeader'
import Footer from '../Footer/Footer'
import { userContext } from '../../Context/UserContext';
import axios from 'axios';
import '../Answer/Answer.css'
import { Link,  useNavigate} from 'react-router-dom';
import PersonIcon from "@mui/icons-material/Person";
import Question from './../Question/Question';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
function Answer ( { logout, value } )
{
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

//     useEffect( () =>
//     {
//       console.log( "yesss" )
//       console.log(localStorage.getItem("question_id"));
//     fetch(`http://localhost:5000/api/users/getAnswer/${localStorage.getItem("auth-token")}`)
//       .then((res) => res.json())
//       .then( ( products ) =>
      
//       {
//         console.log("below is answersss")
//         console.log(products.data)
//         setAnswer( () =>
//         {
//         return  products.data.filter( ( uniquAnswe ) =>
//           {
//           return uniquAnswe.question_id === questionId;
//           })
//         } );
//         setDisplayAnswer( true );
//         console.log("inside answer page") 
//         console.log( products.data );
//       })
//       .catch((error) => {
//         console.log("Error is happen" + error);
//       });
//   }, [tester]);

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
            .post(`http://localhost:5000/api/users/editAnswer/${localStorage.getItem("auth-token")}`, {
            answer: form.answer,
            answerId: localStorage.getItem("answer_id")
            })   
            .then((response) => {
            setTester( true );
            document.getElementById( "answerForm" ).reset();
            navigate("/answer")
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
  
  
  return (
    <div>
      <LoginHeader logout={logout} />
      <div className="answerPage">
        <div className="question">
          <div>
            <h1>Question?</h1>
            <h2> {userAndQuestion[0]?.question} </h2>
            <h3>{userAndQuestion[0]?.question_description} </h3>
          </div>
              </div>
              {/* below alfelgewum gn borderwun silemfelgew new yetewukut  */}
         <div className="communityAnswer">
          <div className="h1">
            <h1>Answer From The Community</h1>
          </div>
          {displayAnswer
            ? answers?.map((answer) => {
                return (
                  <div className="userAndAnswer" >
                    <div className="user">
                      <PersonIcon sx={{ fontSize: 100 }} />
                      <h5 className="userandquestion__email">
                        {answer.user_email}
                      </h5>
                      <div className="arrowForward"></div>
                    </div>
                    <div className="userAndAnswer_answer">
                      <h3> {answer?.answer} </h3>
                    </div>
                    <div className="userAndAnswer_icons">
                      <div className="userAndAnswer_Delete">
                        <DeleteIcon sx={{ color: "red" }} />
                      </div>
                      <div className="userAndAnswer_Edit">
                        <EditIcon sx={{ color: "green" }} />
                      </div>
                    </div>
                    
                  </div>
                  
                );
              })
            : ""}
        </div> 

        <div className="answerPage_question">
          { !value ? <h1> Answer The Top Questions</h1> : <h1>Edit Your Answer</h1>}
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <h3>Go to Question Page</h3>
          </Link>
        </div>
        <form onSubmit={handleSubmit} id="answerForm">
          <textarea
            className="enterAnswe"
            type="text"
            name="answer"
            id="textArea"
            onChange={handleChange}
            placeholder="Your Answer"
          />
          <button className="postAnswer">Post Your Answer</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Answer
