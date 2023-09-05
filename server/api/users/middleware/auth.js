//here yemenseraw user validation
//authenticate kemeseratu befit user login madereg alebet
//we have front end and back end token

const jwt = require( "jsonwebtoken" )
require( "dotenv" ).config();
const auth = ( req, res, next ) => // authenticate ketederege buhala "next" yemebalewun method yseral
{
    try
    {
        const token = req.header("x-auth-token"); // ke front end yemelake token, from header
        if ( !token )
        {
            return res.status( 401 ).json( { msg: "No authentication token, authorization denied" } );
        }
            const verified = jwt.verify( token, process.env.JWT_SECRET );
            console.log("the verified id is"+ verified );
            console.log( verified );
            if ( !verified )
            {
                return res.status( 401 ).json( { msg: "token verification failed, authorization denied." } );
            }
        req.id = verified.id
        next(); 
    }
    catch {
        res.status(500).json({error: error.message})
    }
}  
module.exports = auth;



