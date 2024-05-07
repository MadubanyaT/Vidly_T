const config = require('config');
const mongoose = require('mongoose')
const express = require('express');
const app = express();
const Joi = require('joi');
Joi.ObjectId = require('joi-objectid')(Joi);
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const home = require('./routes/home');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

//today
if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey not defined.');
    process.exit(1)
}

//Database connection
mongoose.connect('mongodb://localhost/Vidly')
    .then(() => console.log('connected to MongoDb...'))
    .catch((err) => console.error('could not connect...'));

//middleware
app.use(express.json());

// Connecting to routes
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

//PORT
const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`Listening on port ${port}...`));