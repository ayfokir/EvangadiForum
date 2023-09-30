import { useContext, useEffect } from "react";
import "./App.css";
import { userContext } from "./Context/UserContext";
import axios from "axios";
import {BrowserRouter as Router,Routes,Route,useNavigate} from "react-router-dom";
import Login from "./Pages/Login/Login.js";
import Home from "./Pages/Home/Home.js";
import Footer from "./Pages/Footer/Footer";
import Questions from "./Pages/Question/Questions";
import Answer from "./Pages/Answer/Answer";
//if you have named import dont forget .js extension
function App() {
  const [ userDta, setUserData ] = useContext( userContext );
  


  const checkLoggedIn = () => { // This function not part of this project  i am doing  just to know how to send token using header
    //check if token already exists in localstorage
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      //token not in localStorage then set with auth token empty
      localStorage.setItem("auth-token", "");
      token = "";
    }
    if (token) {
      console.log(token);   
      //if token exists in localStorage  then use auth to verify token and get user info
      //  console.log(token);
      axios.get( `http://localhost:5000/api/users/auth/`, { // Used to get userById after authenticate the user but 
        //in this case send the token using header.  For the other route in this App we send the token through Params Parameter.
          headers: { "x-auth-token": token } 
         
        })
        .then((response) => {
          //set the global state with user info
          console.log("below is the user Data got after authentication")
          console.log(response)
          setUserData((earlier) => {
            return {
              ...earlier,  
              token,
              user: {
                id: response.data,
                display_name: response.data
              }
            };
          });
        } )
        .catch( ex =>
        {
        console.log("the error is   "+ ex.message)
      })
    }
  };  

  //below is used to remove the token from the local storage when any page of the "App" component  is refresh
  
  useEffect( () =>
  {
    console.log("used to clear")  
    localStorage.clear(); 
  }, [] ); 
  
  console.log("alehu everywhere") 
  
  const logout = () =>  
  {
    console.log("inside logged out function")
    setUserData((earlier) => {
      return { ...earlier, token: undefined, user: undefined };
    });
    localStorage.setItem("auth-token", "");
  };
  // useEffect(() => {
  //   checkLoggedIn(); //automatically run yemedereg
  // }, [] );
  
  
  return (
    <Router>
      <Routes>
        <Route path="/ask-questions"  element={<Questions logout={logout} />} ></Route>
        <Route path="/login" element={ <> <Login /> <Footer /></> }> </Route>
        <Route path="/" element={  <>   <Home logout={logout} />  <Footer /> </>} ></Route>
        <Route path="/answer" element={<Answer logout={logout} />}></Route></Routes> </Router>);}
export default App;
