const express = require('express');
var router = express.Router();
const mysql = require('mysql2/promise');


let pool;
(async function initializePool() {
   pool = await mysql.createPool({
      host: 'remotemysql.com',
      user: 'SH4DOuQpda',
      database: 'SH4DOuQpda',
      password: 'I7F36btJyy'
   });
})();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const [results, fields] = await pool.execute(`SELECT * FROM users WHERE \`username\`='${username}' AND \`password\`='${password}'`)
  if (results.length > 0) {
    res.send({
      ok: true, user: results[0]
    });
  } else {
    res.send({ ok: false });
  }
});

router.post('/register', async (req, res) => {
  const { username, password, firstname, lastname } = req.body;
  const [results, fields] = await pool.execute(`INSERT INTO users (username,password,firstname,lastname) VALUES ((?),(?),(?),(?))`, [username, password, firstname, lastname]);
  if (results.insertId) {
    res.send({ id: results.insertId });
  } else {
    res
      .status(500)
      .send('something went wrong');
  }
});




module.exports = router;