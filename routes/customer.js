const express = require('express');
const Joi = require('joi');
const router = express.Router();
const {customerSchema,Customer}=require('../model/customer');

//Collection of Genres...
router.get('/api/customer', async function (req, res) {
    const customer = await Customer.find().sort('name');
    res.send(customer);
});

//Creation of Customer
router.post('/api/customer', async function (req, res) {
    const customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });

    const joischema = {
        isGold: Joi.boolean().required(),
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(10).max(12).required()
    }
    const joivalidate = Joi.validate(req.body, joischema);
    if (joivalidate.error) return res.status(400).send(joivalidate.error.details[0].message);

    const customersave = await customer.save();
    res.send("New Cusomter is Created")

});


//Update the genres..
router.put('/api/customer/:id', async function (req, res) {

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        $set: {
            isGold: req.body.isGold,
            name: req.body.name,
            phone: req.body.phone
        }
    });

    if (!customer) return res.status(404).send("The customer with the given ID was not found.");

    const joischema = {
        isGold: Joi.boolean().required(),
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(10).max(12).required()

    }
    const joivalidate = Joi.validate(req.body, joischema);

    if (joivalidate.error) {
        res.status(400).send(joivalidate.error.details[0].message);

    }
    res.send('Customer was Updated Successfully')
});

router.delete('/api/customer/:id', async function (req, res) {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.send('Customer was Deleted Successfully')

});
module.exports = router;
