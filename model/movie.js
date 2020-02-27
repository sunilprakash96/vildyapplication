const mongoose=require('mongoose');
const {genreSchema}=require('../model/genres')
//Creation of Schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim:true,
        minlength: 5,
        maxlength: 50
    },
    genre:{
        type: genreSchema,
        required:true
    },
    numberInStock:{
        type: Number,
        required:true,
        minimum: 0,
        maximum: 255
    },
    dailyRentalRate:{
        type: Number,
        required:true,
        minimum: 0,
        maximum: 255
    }

})

//Creation of collection
const Movie = mongoose.model('Movie', movieSchema);

exports.movieSchema=movieSchema;
exports.Movie=Movie;