const pool = require( '../../config/database.js' );



module.exports = {
  register: (data, callback) => {
    pool.query(
      `INSERT INTO registration(user_name, user_email, user__password)  VALUES (?,?,?) `,

      [data.userName, data.email, data.password],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  question: (data, callback) => {
    pool.query(
      `INSERT INTO question(user_id,  question, question_description) VALUES(?,?,?) `,
      [data.userId, data.myQuestion, data.question_description],
      (err, result) => {
        console.log(result);
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },

  answers: (data, callback) => {
    pool.query(
      `INSERT INTO answer(user_id,  answer, question_id) VALUES(?,?,?) `,
      [data.userId, data.answer, data.questionId],
      (err, result) => {
        console.log(result);
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },

  profile: (data, callback) => {
    pool.query(
      `INSERT INTO profile(user_id, first_name, last_name) VALUES(?,?,?) `,
      [data.userId, data.firstName, data.lastName],
      (err, result) => {
        console.log("the profile result is below");
        console.log(result);
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },

  userById: (id, callback) => {
    pool.query(
      `SELECT registration.user_id, user_name, user_email, first_name, last_name FROM  registration LEFT JOIN
      profile ON registration.user_id = profile.user_id WHERE registration.user_id = ? `,
      [id],
      (err, result) => {
        if (err) return callback(err);
        return callback(null, result[0]);
      }
    );
  },
  getUserByEmail: (email, callback) => {
    pool.query(
      `SELECT * FROM registration WHERE user_email = ?`,
      [email],
      (err, result) => {
        if (err) return callback(err);
        return callback(null, result[0]);
      }
    );
  },

  getAllUsers: (callback) => {
    pool.query(
      `SELECT user_id, user_name, user_email FROM registration `,
      (err, result) => {
        if (err) return callback(err);
        return callback(null, result); 
      }
    );
  },
  // getAllUsers: (callback) => {
  //   pool.query(
  //     `SELECT user_id, user_name, user_email FROM registration `,
  //     (err, result) => {
  //       if (err) return callback(err);
  //       return callback(null, result);
  //     }
  //   );
  // },

  

  getquestions: (callback) => {
    console.log("hi");
    pool.query(
      `SELECT registration.user_email, question.question, question.question_description, question.user_id, question.question_id FROM registration JOIN question ON registration.user_id = question.user_id  `,
      (err, result) => {
        if (err) return callback(err);
        return callback(null, result);
      }
    );
  },
  getanswer: (callback) => {
    pool.query(
      `SELECT answer.user_id, answer.answer, answer.question_id FROM answer  JOIN question ON answer.question_id = question.question_id`,
      (err, result) => {
        if (err) return callback(err);
        return callback(null, result);
      }
    );
  }
};




