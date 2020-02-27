const mongoose = require('mongoose');

//Creation of Schema
const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true, 
                minlength: 5,
                maxlength: 25
            },
            isGold: {
                type: Boolean
            },
            phone: {
                type: String,
                required: true,
                minlength: 10,
                maxlength: 12,
            },

        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                min: 0,
                required: true
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    DateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

// Creation of Collection for the Mongodb 
const Rental=mongoose.model('Rental', rentalSchema);


exports.rentalSchema=rentalSchema;
exports.Rental=Rental;