const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const config=require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { User } = require('../model/user');



router.post('/api/auth', async function (req, res) {

    const joischema = {
        email: Joi.string().min(5).email().required(),
        password: Joi.string().min(10).required()
    }

    const joivalidate = Joi.validate(req.body, joischema);
    if (joivalidate.error) return res.status(400).send(joivalidate.error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid Email or Password");

    const passwordvalid = await bcrypt.compare(req.body.password, user.password);
    if (!passwordvalid) return res.status(400).send("Invalid Email or Password");

    const token = jwt.sign({ _id: user._id }, config.get('jwtPrivatekey'));
    res.send(token);
});

module.exports = router;