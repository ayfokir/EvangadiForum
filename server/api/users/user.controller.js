const pool = require( '../../config/database' );
const bcrypt = require('bcryptjs');
const { register, userById, getUserByEmail, profile, getAllUsers, question, getquestions, answers, getanswer, questionUpdate, deletQuestion, answerUpdate, deletAnswer } = require( './user.service' )
const jwt = require( 'jsonwebtoken' );
require( "dotenv" ).config();

 let userId = 22;  
module.exports = {
  creatUser: (req, res) => {
    console.log("the req.body result is below");
    console.log(req.body);
    const { firstName, lastName, userName, email, password } = req.body;
    if (!userName || !firstName || !lastName || !email || !password)
      return res.status(400).json({ msg: `Not all fields have been provided` });
    console.log(password.length);
    // below the reason i use (password.join( "" )) is to change array string
    //into string becaue password is look like = [ "12345678" ] if your password is "12345678"
    if (password.join("").length < 8)
      return res
        .status(400)
        .json({ msg: `password must be at least 8 characters` });
    pool.query(
      `SELECT * FROM registration WHERE user_email = ?`,
      [email],
      (err, results) => {
        if (err) {
          return res.status(err).json({ msg: `database connection error` });
        }
        if (results.length > 0) {
          return res
            .status(400)
            .json({ msg: `an account with this email already exists` });
        } else {
          // then new temezgaby kehone register  madereg alebn
          const salt = bcrypt.genSaltSync(10);
          req.body.password = bcrypt.hashSync(password.toString(), salt);
          //yemetawun password hash dergeh yeneberwun password replace aderge

          register(req.body, (err, results) => {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .json({ msg: `database connection error ` });
            }
            pool.query(
              `SELECT * FROM registration WHERE user_email = ?`,
              [email],
              (err, results) => {
                if (err) {
                  return res
                    .status(err)
                    .json({ msg: "database connection error " });
                }
                req.body.userId = results[0].user_id; // add a userId property
                console.log(req.body);
                console.log(results);

                profile(req.body, (err, results) => {
                  if (err) {
                    console.log(err);
                    return res
                      .status(500)
                      .json({ msg: "database connection eror" });
                  }
                  pool.query(
                    `SELECT user_id, user_name FROM registration WHERE user_email = ?`,
                    [email],
                    (err, result) => {
                      const token = jwt.sign(
                        { id: result.user_id },
                        process.env.JWT_SECRET,
                        { expiresIn: "2h" }
                      );
                      return res.status(200).json({
                        msg: "new user add successfully",
                        token,
                        user: result[0]
                      });
                    }
                  );
                });
              }
            );
          });
        }
      }
    );
  },

  getUsers: (req, res) => {
    getAllUsers((err, results) => {
      if (err) {
        console.log(err).status(500).json({ msg: "database connection error" });
      }
      return res.status(200).json({ data: results });
    });
  },
  getUserById: (req, res) => {
    // const id = req.params.id;
    // console.log( "id ===>", id, "user===>", req.id );
    userById(req.id, (err, results) => {
      if (err) {
        console.log("the error is here");
        console.log(err);
        return res.status(500).json({ msg: "database connection error" });
      }
      if (!results) {
        return res.status(400).json({ msg: "recored not found" });
      }
      return res.status(200).json({ data: results });
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;
    console.log([email, password]);
    //validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been provided" });
    }
    getUserByEmail(email, async (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: "database connetion error" });
      }
      if (!results) {
        return res.json({
          msg: "no account with this email has been registered"
        });
      }
      //results.user_password: ke database yemetaw
      console.log("see below the Password from database ");
      console.log(results.user__password);
      const isMatch = await bcrypt.compare(
        password.toString(),
        results.user__password
      );
      console.log("see isMatch below ");
      console.log(isMatch);
      if (!isMatch) {
        console.log("error 2");
        return res.json({ msg: "Invalid Pssword" });
      }
      //token: automatically generate yemedereg json web token new
      const token = jwt.sign({ id: results.user_id }, process.env.JWT_SECRET, {
        expiresIn: "72h"
      });
      console.log(token);
      return res.json({
        token,
        user: {
          user_id: results.user_id,
          user_name: results.user_name, // welecome ayfo yemebalew bezeh grape tedergo new
          email: email
        }
      });
    });
  },

  submitQuestion: (req, res) => {
    //  const { myQuestion, question_description } = req.body;
    //  console.log("this is inside question")
    //  console.log( req.body );
    console.log("ys ayfo berta ");
    const userId = req.body.user;
    const myQuestion = req.body.myQuestion;
    const question_description = req.body.question_description;
    console.log({ userId, myQuestion, question_description });
    question({ userId, myQuestion, question_description }, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection eror" });
      }
      return res.status(200).json({
        msg: "new question add successfully",
        data: result
      });
    });
  },

  editQuestion: (req, res) => {
    console.log("updated ");
    console.log(req.body);
    const questionId = req.body.questionId;
    const userId = req.body.user;
    const myQuestion = req.body.myQuestion;
    const question_description = req.body.question_description;

//     ResultSetHeader {
//   fieldCount: 0,
//   affectedRows: 1,
//   insertId: 0,
//   info: 'Rows matched: 1  Changed: 0  Warnings: 0',
//   serverStatus: 2,
//   warningStatus: 0,
//   changedRows: 0
// }
    questionUpdate(
      { questionId, myQuestion, question_description },
      ( err, result ) =>
      {
        console.log( "below is the result when you edit " )
        console.log(result)
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "database connection eror" });
        }
        console.log("edited ayfo");
        return res.status(200).json({
          msg: "new question updated successfully",

        });
      }
    );
  },


  editAnswer: (req, res) => {
    console.log("Edit Answer ");
    console.log(req.body);
    const answer = req.body.answer;
    const answerId = req.body.answerId;

    answerUpdate({ answer, answerId }, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection eror" });
      }
      console.log("answer edited ayfo");
      return res.status(200).json({
        msg: "answer updated successfully",
        data: result
      });
    });
  },

  deleteQuestion: (req, res) => {
    let question_id = req.params.question_id;
    deletQuestion({ question_id }, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection eror" });
      }
      return res.status(200).json({
        msg: "Question  and Answer Deleted ",
        data: result
      });
    });
  },
  
  deleteAnswer: (req, res) => {
    let answer_id = req.params.answer_id;
    console.log("see the answer id "  + answer_id )
    deletAnswer({ answer_id }, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection eror" });
      }
      return res.status(200).json({
        msg: "Answer Deleted",
        data: result
      });
    });   
  },
  submitAnswer: (req, res) => {
    const userId = req.body.user;
    const answer = req.body.answer;
    const questionId = req.body.questionId;
    console.log("your body content");
    console.log(req.body);
    answers({ userId, answer, questionId }, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection eror" });
      }
      return res.status(200).json({
        msg: "new question add successfully",
        data: result
      });
    });
  },

  getQuestions: (req, res) => {
    getquestions((err, results) => {
      if (err) {
        console.log(err).status(500).json({ msg: "database connection error" });
      }
      return res.status(200).json({ data: results });
    });
  },
  getAnswer: (req, res) => {
    console.log("yes ayfo refresh sitareg dershalew");
    getanswer((err, results) => {
      if (err) {
        console.log(err).status(500).json({ msg: "database connection error" });
      }
      return res.status(200).json({ data: results });
    });
  }
};








