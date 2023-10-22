const router = require( 'express' ).Router();
const auth = require( './middleware/auth' );
const { creatUser, getUsers, getUserById, login, submitQuestion, getQuestions, submitAnswer, getAnswer, editQuestion, deleteQuestion, editAnswer, deleteAnswer } = require( "./user.controller" );  

   
router.post( '/', creatUser );// The user registered and consequently get a token
router.post("/login", login) // The user Logged in and consequently get Token
//authentication: Used to check is the user valid user or not 
//auth: is middleware
router.get( "/all",auth, getUsers );//This also not part of  the project.
router.get( "/auth",auth, getUserById );//This also not part of  the project.
router.post( "/question/:token",auth, submitQuestion );
router.get( "/getQuestions/:token",auth, getQuestions );
router.post( "/answer/:token",auth, submitAnswer );
router.get("/getAnswer/:token",auth, getAnswer);
router.post( "/editQuestion/:token", auth, editQuestion )
router.get("/deleteQuestion/:question_id", deleteQuestion);
router.post( "/editAnswer/:token", editAnswer );
router.get("/deleteAnswer/:answer_id", deleteAnswer);
module.exports = router;


      
