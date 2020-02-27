const { Movie } = require('../model/movie');
const { Genres } = require('../model/genres');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.get('/api/movie',async function(req, res){
    const movie=await Movie.find().sort('name');
    res.send(movie);
});

router.post('/api/movie', async (req, res) => {
    
        const genre = await Genres.findById(req.body.genreid);
        console.log(genre);
        if (!genre && genre==null) return res.status(400).send('Invalid genre.');

        //Validate the Body request...
        const joischema = {
            title: Joi.string().min(1).max(50).required(),
            genreid:Joi.string().required(),
            numberInStock: Joi.string().min(0).max(255).required(),
            dailyRentalRate: Joi.string().min(0).required()
        }

        let movie = new Movie({
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        });
        const joivalidate=Joi.validate(req.body,joischema);
        if(joivalidate.error)
            return res.status(400).send(joivalidate.error.details[0].message);
        
        movie = await movie.save();
        res.send("Movie created Successfully");
  
});

router.put('/api/movie/:id', async function (req, res) {

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }
    })
    if(!movie) return res.status(400).send("The given Movieid is not found");

    const joischema = {
        title: Joi.string().min(1).max(50).required(),
        numberInStock: Joi.string().min(0).max(255).required(),
        dailyRentalRate: Joi.string().min(0).required()
    }
   
    const joivalidate=Joi.validate(req.body,joischema);
    console.log(joivalidate);
    if(joivalidate.error) 
    return res.status(404).send(joivalidate.error.details[0].message);
    res.send("Movie was Updated Successfully")
});

router.delete('/api/movie/:id',async function(req, res){
    const movie= await Movie.findByIdAndRemove(req.params.id);
    if(!movie) return res.status(400).send('The givenid of Movie is not found');
    res.send("Movie was Deleted Successfully");

});
module.exports = router; 