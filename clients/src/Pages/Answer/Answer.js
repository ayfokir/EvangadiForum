import React, { useContext, useEffect, useState } from 'react'
import LoginHeader from '../Login/LoginHeader'
import Footer from '../Footer/Footer'
import { userContext } from '../../Context/UserContext';
import axios from 'axios';
import './Answer.css'
import { Link,  useNavigate} from 'react-router-dom';
import PersonIcon from "@mui/icons-material/Person";
function Answer ( { logout } )
{
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(userContext);
  const [userAndQuestion, setUserAndQuestion] = useState([]);
  const [answers, setAnswer] = useState({});
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [form, setForm] = useState({});
  const [ tester, setTester ] = useState( false );
  //The token attache to the URL, found below is used for authentication
  useEffect(() => {
    fetch(`http://localhost:5000/api/users/getQuestions/${userData.token}`)
      .then((res) => res.json())
      .then((products) => {
        setUserAndQuestion( () => products.data );
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
  
    fetch(`http://localhost:5000/api/users/getAnswer/${userData.token}`)
      .then((res) => res.json())
      .then( ( products ) =>
      
      {
        console.log("below is answersss")
        console.log(products.data)
        setAnswer( () =>
        {
        return  products.data.filter( ( uniquAnswe ) =>
          {
          return  uniquAnswe.question_id === userData.questionId
          })
        } );
        setDisplayAnswer( true );
        console.log("inside answer page ")
        console.log( products.data );
      })
      .catch((error) => {
        console.log("Error is happen" + error);
      });
  }, [tester]);



  const handleChange = (e) => {
    e.preventDefault();
    setForm((earlier) => {
      return { ...earlier, [e.target.name]: [e.target.value] };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    try {
      axios
        .post(`http://localhost:5000/api/users/answer/${userData.token}`, {
          answer: form.answer,
          user: userData.user,
          questionId: userData.questionId
        })
        .then((response) => {
          setTester( true );
          document.getElementById("answerForm").reset();
        });
    } catch (err) {
      console.log("Error from PostAnswer");
      console.log(err);
   
    }
  };

  //The useEffect function below is used to display login page if a user refreshes the current page. you can also use  userData.user
  useEffect(() => {
    if (!userData.token) navigate("/login");
  }, [ userData.token, navigate ] );
  
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
            <h2> {userData?.question} </h2>
            <h3>{userData?.question_description} </h3>
          </div>
        </div>
        <div className='communityAnswer'>
          <div className="h1">
            <h1>Answer From The Community</h1>
          </div>
          {
            
     displayAnswer ? answers?.map((answer) => {
                return (
                  <div className="userAndAnswer">
                    <div className="user">
                      <PersonIcon sx={{ fontSize: 100 }} />
                      <h5 className="userandquestion__email">
                        { answer.user_email } 
                      </h5>
                      <div className="arrowForward"></div>
                    </div>
                    <div>
                      <h3> {answer?.answer} </h3>
                    </div>
                  </div>
                );
              })
            : ""}

        </div>

        <div className="answerPage_question">
          <h1>Answer The Top Questions</h1>
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <h3>Go to Question Page</h3>
          </Link>
        </div>
        <form onSubmit={handleSubmit} id='answerForm'>
          <textarea
            className="enterAnswe"
            type="text"
            name="answer"
            id='textArea'
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
