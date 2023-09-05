const router = require( 'express' ).Router();
const auth = require( './middleware/auth' );
const { creatUser, getUsers, getUserById, login, submitQuestion, getQuestions, submitAnswer, getAnswer } = require( "./user.controller" );  


router.post( '/', creatUser );// "slashe" becha kehone(ke post man silake malet new ) creatUser yemelewun siralegne 
router.get( "/all", getUsers );
router.get( "/",auth, getUserById );//we need a token
router.post("/login", login)
//authentication yemeyasfelgrn user is valid or not 
//auth: is middleware
router.post( "/question", submitQuestion );
router.get( "/getQuestions", getQuestions );
router.post( "/answer", submitAnswer );
router.get("/getAnswer", getAnswer);


module.exports = router;



