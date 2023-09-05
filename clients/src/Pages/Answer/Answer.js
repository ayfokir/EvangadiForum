import React, { useContext, useEffect, useState } from 'react'
import LoginHeader from '../Login/LoginHeader'
import Footer from '../Footer/Footer'
import { userContext } from '../../Context/UserContext';
import axios from 'axios';
import './Answer.css'
import { Link, useFetcher, useNavigate} from 'react-router-dom';
import PersonIcon from "@mui/icons-material/Person";
function Answer ( { logout } )
{
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(userContext);
  const [userAndQuestion, setUserAndQuestion] = useState([]);
  const [answers, setAnswer] = useState({});
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [form, setForm] = useState({});
  const [email, setEmail] = useState([]);
  // console.log( userAndQuestion );  
  // console.log(answers)
  useEffect(() => {
    fetch("http://localhost:5000/api/users/getQuestions")
      .then((res) => res.json())
      .then((products) => {
        setUserAndQuestion(() => products.data);
        //  console.log(products.data);
      })
      .catch((error) => {
        console.log("Error is happen" + error);
      });
  }, []);

  // console.log(answers)
  
    useEffect( () =>
    {
  
    fetch("http://localhost:5000/api/users/getAnswer")
      .then((res) => res.json())
      .then( ( products ) =>
      {
        setAnswer(() => products.data.filter( ( answerr ) => answerr.question_id == userData.questionId ) );
      //  console.log(products.data)
        setDisplayAnswer( true );
        // console.log( answers );//
        
      })
      .catch((error) => {
        console.log("Error is happen" + error);
      });
  });

  //console.log(email)
  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);

  const handleChange = (e) => {
    e.preventDefault();
    setForm((earlier) => {
      return { ...earlier, [e.target.name]: [e.target.value] };
    });
  };
  let array = [];

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      //sending answer to the database.
      axios
        .post("http://localhost:5000/api/users/answer", {
          answer: form.answer,
          user: userData.user,
          questionId: userData.questionId
        })
        .then((response) => {
          //  console.log(response);
        });
    } catch (err) {
      // console.log( "problem", err.response.data.msg )
      console.log("Error from PostAnswer");
      console.log(err);
      // alert(err.response.data.msg)
    }
    // fetch("http://localhost:5000/api/users/all")
    //   .then((res) => res.json())
    //   .then( ( products ) =>
    //   {
    //     for ( let i = 0; i < products.data.length; i++ )
    //     {
    //       if ( products.data[ i ].user_email == userData.email[ 0 ] )
    //       {
    //       setEmail(products.data[i].user_email);
    //       }
    //       console.log(array)
    //     }
    //     console.log(products.data)
    //   })
    //   // console.log( answers );
    //   .catch((error) => {
    //     console.log("Error is happen" + error);
    //   } );
  };







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
          {/* <h2>{userData?.questionId }</h2> */}
        </div>
        <div>
          <div className="h1">
            <h1>Answer From The Community</h1>
          </div>

          {displayAnswer
            ? answers?.map((answer) => {
                return (
                  <div className="userAndAnswer">
                    <div className="user">
                      <PersonIcon sx={{ fontSize: 100 }} />
                      <h5 className="userandquestion__email">
                        {/* {
                          function filterFunction()
                          {
                         return email?.filter((array) => array.user_id == answers?.user_id); 
                          }
                        } */}

                        {/* { filterFunction().user_email } */ }

            
                        
                        
                        
                      </h5>
                      <div className="arrowForward"></div>
                    </div>
                    <div>
                      <h2> {answer?.answer} </h2>
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
        <form onSubmit={handleSubmit}>
          <textarea
            className="enterAnswe"
            type="text"
            name="answer"
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
