const mysql2 = require("mysql2");
var pool = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Ayfo@19!",
  database: "evangadiforum"
});

pool.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  //   con.query("CREATE DATABASE evangadiForum", function (err, result) {
  //     if (err) throw err;
  //     console.log("Database created");
  //   });
} );

let registration = `CREATE TABLE if not exists registration(
    user_id int auto_increment, 
    user_name varchar(255) not null,
    user_email varchar(255) not null,
    user__password varchar(255) not null,
    PRIMARY KEY (user_id))`;
let profile = `CREATE TABLE if not exists profile(
    user_profile_id int auto_increment,
    user_id int  not null,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    PRIMARY KEY (user_profile_id),
    FOREIGN KEY (user_id) REFERENCES  registration(user_id) 
)`;

let question = `CREATE TABLE if not exists question(
    question_id int auto_increment,
    question varchar(255) not null,
    question_description varchar(255),
    question_code_block varchar(255),
    tags varchar(255),    
    user_id int not null,
    PRIMARY KEY (question_id),    
    FOREIGN KEY (user_id) REFERENCES registration(user_id)  
)`;

let answer = `CREATE TABLE if not exists answer(
    answer_id int auto_increment,
    answer varchar(255) not null,
    answer_code_block varchar(255),
    user_id int not null,
    question_id int not null,
    PRIMARY KEY (answer_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id),
    FOREIGN KEY (question_id) REFERENCES question(question_id )
    )`;
//let us creat the table  

pool.query( registration, ( err, rows, fields ) =>
{   
    if ( err ) throw err;
    console.log( `registration table is created` );
    
})  

pool.query(profile, (err, rows, fields) => {
  if (err) throw err;
  console.log(`profile table is created`);
});

pool.query(question, (err, rows, fields) => {
  if (err) throw err;
  console.log(`question table is created`);
});

pool.query(answer, (err, rows, fields) => {
  if (err) throw err;
  console.log(`answer table is created`);
});

// var sql = "DELETE FROM registration WHERE user_id = '10'";

// pool.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Number of records deleted: " + result.affectedRows);
// });

// var sql = "DROP TABLE question ";
// pool.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Number of records deleted: " + result.affectedRows);
// });  

module.exports = pool;     
 

