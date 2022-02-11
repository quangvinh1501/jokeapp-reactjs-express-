const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbvote'
});

connection.connect(function (err) {
  (err) ? console.log(err) : console.log(connection);
});
// app.get("/api/getAllVotes/:voteid", async (req, res) => {
//   var voteid = req.params.voteid
//   if (voteid === null) voteid = 0;
//   console.log(voteid, 'gia tri id truyen vao express');
//   //var sql ='SELECT * FROM tbljoke';
//   var sql = 'SELECT * FROM tbljoke LIMIT 1';
//   connection.query(sql, function (err, results) {
//     if (err) throw err;
//     res.json(results);
//   });
// })
app.get("/api/getAllVotes", async (req, res) => {
  const idoffset = req.query.idoffset;
  console.log(idoffset,'offset nhan o express la');
  var sql ='SELECT * FROM tbljoke LIMIT 1 OFFSET '+idoffset;
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json(results);
  });
});
app.put("/api/updatevotelike", async (req, res) => {
  const vote_id = req.body.vote_id;
  console.log(vote_id,'iddddddddddddd');
  var sql = 'UPDATE tbljoke set vote_like = vote_like + 1 WHERE vote_id = '+vote_id;
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json(results);
  });
});
app.put("/api/updatevotedisklike", async (req, res) => {
  const vote_id = req.body.vote_id;
  console.log(vote_id,'iddddddddddddd');
  var sql = 'UPDATE tbljoke set vote_dislike = vote_dislike + 1 WHERE vote_id = '+vote_id;
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json(results);
  });
});
app.listen(4000, () => console.log('App listening on port 4000'));
