import React from 'react'
import LoginHeader from '../Login/LoginHeader'
import Question from './Question'
import Footer from '../Footer/Footer'
function Questions ( { logout } )
{
    console.log("hi man")
    return (
      
        <>
          <LoginHeader logout = {logout} />
        <div>
         <Question />
        </div>
        <Footer />
        </>
  )
}

export default Questions
