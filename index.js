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


//PORT
const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`Listening on port ${port}...`));