const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { genreSchema, Genres } = require('../model/genres');


//Collection of Genres...
router.get('/api/genres', async function (req, res) {
    const genre = await Genres.find().sort('name');
    res.send(genre);
});

//Creation of Genres
router.post('/api/genres', async function (req, res) {
    const genre = new Genres({
        name: req.body.name
    })
    const joischema = {
        name: Joi.string().min(3).max(50).required()
    }
    const joivalidate = Joi.validate(req.body, joischema);

    if (joivalidate.error) {
        res.status(400).send(joivalidate.error.details[0].message);
    }

    const result = await genre.save();
    res.send("Created New Genres Sucessfully");

});

//Update the genres..
router.put('/api/genres/:id', async function (req, res) {

    const genre = await Genres.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name
        }
    });

    if (!genre) return res.status(404).send("The genre with the given ID was not found.");

    const joischema = {
        name: Joi.string().min(3).required()
    }
    const joivalidate = Joi.validate(req.body, joischema);

    if (joivalidate.error) {
        res.status(400).send(joivalidate.error.details[0].message);

    }
    res.send('Genres was Updated Successfully')
});

router.delete('/api/genres/:id', async function (req, res) {
    const genre = await Genres.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send('Genres was Deleted Successfully')

});

module.exports = router;

