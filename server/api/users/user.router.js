const router = require( 'express' ).Router();
const auth = require( './middleware/auth' );
const { creatUser, getUsers, getUserById, login, submitQuestion, getQuestions, submitAnswer, getAnswer } = require( "./user.controller" );  


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


module.exports = router;



