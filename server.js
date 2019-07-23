const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const methodOverride = require('method-override')

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const vacations = require('./routes/api/vacations.js');

const app = express();

app.use(methodOverride('X-HTTP-Method-Override'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/vacations', vacations);



app.get('/api/users', (req, res) => {
  res.send([
    { id: 1, firstName: 'John', lastName: 'Barcelona', username: 'Fold', password: '1234' },
    { id: 1, firstName: 'Nash', lastName: 'Barcelona', username: 'Call', password: '1234' },
    { id: 1, firstName: 'Nuji', lastName: 'Barcelona', username: 'Raise', password: '1234' },
  ])
});




const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));

