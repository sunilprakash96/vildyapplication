const express = require('express');
const app = express();
const config = require('config');
const genres = require('./routes/genres');
const customer = require('./routes/customer');
const movie = require('./routes/movie');
const rental = require('./routes/rental');
const user = require('./routes/user');
const authenticate = require('./routes/auth');
const mongoose = require('mongoose');

// if (!config.get('jwtPrivatekey')) {
//     console.error('FATAL ERROR: jwt is not defined');
//     process.exit(1);
// }

app.use(express.json());
app.use(genres);
app.use(customer);
app.use(movie);
app.use(rental);
app.use(user);
app.use(authenticate);


//Connection for Mongodb...
mongoose.connect('mongodb://localhost:27017/vidly')

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Connected to port' + port);
});
