const express = require('express');
const cors = require( 'cors' );
// const database = require( './server/config/database' );
//hulunm database file wust yalewun neger new yametahut  
const bodyParser = require('body-parser')
require("dotenv").config();// to read ports from .env file
const port = process.env.PORT;
const app = express();
const userRouter = require('./server/api/users/user.router');
// const pool = require( './server/config/database' );
app.use( cors() );
app.use( bodyParser.urlencoded( { extended: true } ) );  
app.use( express.json() );

app.use( '/api/users', userRouter )

app.listen( port, () =>    
{
    console.log(`Listen at https://localhost:${port}`)
} )




