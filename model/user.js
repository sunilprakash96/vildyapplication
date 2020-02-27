const mongoose = require('mongoose');

//Creation of Schema for the Mongodb
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        minlength: 5,
        maxlength: 255
    },
    email:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255
    },
    password:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255
    }
});

//Creation of Collection for mongodb 
const User=mongoose.model('User', userSchema);

exports.userSchema=userSchema;
exports.User=User;

