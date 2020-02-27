const mongoose=require('mongoose');
//Creation of Schema
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
})

//Creation of collection
const Genres = mongoose.model('Genre', genreSchema);

exports.genreSchema=genreSchema;
exports.Genres=Genres;