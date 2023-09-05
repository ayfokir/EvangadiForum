
import { useContext, useEffect } from 'react';
import './App.css';
import { userContext } from './Context/UserContext';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from './Pages/Login/Login.js'
import Signup from './Pages/Signup/Signup.js'
import Home from './Pages/Home/Home.js'
import Footer from './Pages/Footer/Footer';
import Questions from './Pages/Question/Questions';
import Answer from './Pages/Answer/Answer';
//if you have named import dont forget .js extension    
function App ()
{
  
  const [ userDta, setUserData ] = useContext( userContext )   
  const checkLoggedIn =  () =>
  {
    //check if token already exists in localstorage
    let token = localStorage.getItem( 'auth-token' )
    if ( token === null )
    {
      //token not in localStorage then set with auth token empty
      localStorage.setItem( 'auth-token', '' )
      token = '';
    }
    if(token) 
    {
      console.log(token)
      //if token exists in localStorage  then use auth to verify token and get user info  
      //  console.log(token);
    axios.get( 'http://localhost:5000/api/users', {  

        header: { 'x-auth-token': token } // header lay yaskemtal ke localStorage amteto auth endesera wode back end telko;
        // then getUserById belen yeseranew
      } ).then( response  => {
    
        //set the global state with user info
        setUserData( (earlier) => {
          return {
            ...earlier,
            token,
            user: {
            id: response.data.data.user_id,
            display_name: response.data.data.user_name
          }}
        } )
      
      })
    }
  };

useEffect(() => {
  localStorage.clear();
}, []);


  // console.log( userDta );
  const signIn = () => {
   // let email = document.getElementById( "email" );
   // email.focus();
   setUserData((earlier) => {
     return { ...earlier, value2: false };
   });
   setUserData((earlier) => {
     return { ...earlier, value1: false };
   });
 };

  
  const logout = () =>
  {
     setUserData( (earlier) => {
      return { ...earlier,
        token: undefined,
        user: undefined,}
     } )
    localStorage.setItem("auth-token", "");
  };
  useEffect( () => 
  {   
     checkLoggedIn(); //automatically run yemedereg
  }
    , [] )     
  return (
    <Router>
      <Routes>
        <Route
          path="/ask-questions"
          element={<Questions logout={logout} />}
        ></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/login"
          element={
            <>
              <Login signIn={signIn} />
              <Footer />
            </>
          }
        >
          {" "}
        </Route>
        <Route
          path="/"
          element={
            <>
              <Home logout={logout} />
              <Footer />
            </>
          }
        ></Route>

        <Route path="/answer" element={<Answer logout={logout} />}></Route>
      </Routes>
    </Router>
  );
}
export default App;
