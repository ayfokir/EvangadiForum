import React, { createContext, useState } from 'react'
export const userContext = createContext();
function ContextProvider (props)
{
    const [ userData, setUserData ] = useState( // ke login yemeta data.
        {
        user: undefined,
        token: undefined,
        value1: false,
        value2: false,
        question: "hello",
        question_description: "yes man",
        // AnswerUserId: [],
        // Answer:  [],
        }
  );
  

 


  return (
    <>
          <userContext.Provider  value = {[userData, setUserData]} >
             {props.children}  
           </userContext.Provider>
      </>
  )
}

export  {ContextProvider};
