const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const config = require('config')
const lodash = require('lodash');
const { User } = require('../model/user');

router.get('/api/user', async function (req, res) {
    const user = await User.find().sort('name');
    res.send(user);
});

router.post('/api/user', async function (req, res) {
    const joischema = {
        name: Joi.string().min(5).required(),
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(10).required()
    };

    const joivalidate = Joi.validate(req.body, joischema);
    if (joivalidate.error) return res.status(400).send(joivalidate.error.details[0].message);

    const users = await User.findOne({ email: req.body.email });
    if (users) return res.status(400).send('Email Already Registered');

    const user = await new User(lodash.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    console.log(user.password)
    const useresult = await user.save();
    const token = jwt({ _id: user._id }, "mySecretKey");
    res.header('x-auth-token', token).send(lodash.pick(user, ['name', 'email']));
    // res.send(lodash.pick(user,['name','email']));
    // res.status(200).send('Registered Successfully');

});


module.exports = router;

