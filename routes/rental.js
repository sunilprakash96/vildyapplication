const express = require('express');
const router = express.Router();
const Joi = require('joi');
// let Joi.objectid=require('joi-objectid')(Joi);
const { Rental } = require('../model/rental');
const { Customer } = require('../model/customer');
const { Movie } = require('../model/movie');

router.post('/api/rental', async function (req, res) {
   
    const joischema = {
        customerId: Joi.string().min(10).required(),
        movieId: Joi.string().min(10).required()
    }

    const joivalidate = Joi.validate(req.body, joischema);
    console.log(joivalidate);
    if (joivalidate.error) return res.status(400).send(joivalidate.error.details[0].message);
   
    const customer = await Customer.findById(req.body.customerId);
    console.log(customer);
    const movie = await Movie.findById(req.body.movieId);
    console.log(movie);

    const rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    
    const result = await rental.save();

    const movieupdate = movie.numberInStock--;

    const movieresult = await movie.save();


});


module.exports = router;