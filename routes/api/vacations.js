const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');


let pool;
(async function initializePool() {
   pool = await mysql.createPool({
      host: 'localhost',
      user: 'root',
      database: 'new_schema',
      password: '1234'
   });
})();

router.get('/user/:userId', async (req, res) => {
   const { userId } = req.params;
   pool.execute(`SELECT vacations.*, user_vacation.user_id as user_id FROM vacations LEFT JOIN user_vacation ON user_vacation.user_id = ${userId} AND vacations.id = user_vacation.vacation_id`, (err, results, fields) => {
      if (err) {
         console.log(err);
      } else {
         res.send(results.map(vacation => {
            vacation.favorited = false;
            if (vacation.user_id) {
               vacation.favorited = true;
            }
            return vacation;
         }));
      }
   });
});

router.get('/', async (req, res) => {
   pool.execute(`SELECT * FROM vacations`, (err, results, fields) => {
      if (err) {
         console.log(err);
      } else {
         res.send(results);
      }
   });
});

router.post('/favorite', async (req, res) => {
   const { userId, vacationId } = req.body;
   const [results,] = await pool.execute('INSERT INTO user_vacation (user_id, vacation_id) VALUES ((?), (?))', [userId, vacationId]);
   if (results.insertId) {
      res.send({ id: results.insertId });
   } else {
      res
         .status(500)
         .send('something went wrong');
   }
});

router.delete('/favorite', async (req, res) => {
   const { userId, vacationId } = req.body;
   const [results] = await pool.execute('DELETE FROM user_vacation WHERE user_id=(?) AND vacation_id=(?)', [userId, vacationId]);
   if (results.deleteId) {
      res.send({ id: results.deleteId });
   } else {
      res
         .status(500)
         .send('something went wrong');
   }
});

router.post('/', async (req, res) => {
   const { description, destination, fromDate, toDate, price, picture } = req.body;
   console.log(req.body);
   const [results] = await pool.execute('INSERT INTO vacations ( description ,destination ,fromdate, todate ,price, picture) VALUES ((?),(?),(?),(?),(?),(?))', [description, destination, fromDate, toDate, price, picture]);
   if (results) {
      res.send(results);
   } else {
      res
         .status(500)
         .send('something went wrong');
   }
});

router.delete('/:id', async (req, res) => {
   const { id } = req.params;
   const [results] = await pool.execute('DELETE FROM vacations WHERE id=(?)', [id]);
   if (results.deleteId) {
      res.send({ id: results.deleteId });
   } else {
      res
         .status(500)
         .send('something went wrong');
   }
});

router.put('/:id', async (req, res) => {
   const { description, destination, fromDate, toDate, price, picture } = req.body;
   console.log(req.body);
   const [results] = await pool.execute('INSERT INTO vacations ( description ,destination ,fromdate, todate ,price, picture) VALUES ((?),(?),(?),(?),(?),(?))', [description, destination, fromDate, toDate, price, picture]);
   if (results) {
      res.send(results);
   } else {
      res
         .status(500)
         .send('something went wrong');
   }
});
module.exports = router;