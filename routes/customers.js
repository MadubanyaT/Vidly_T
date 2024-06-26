const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customer');
const auth = require('../middleware/auth')

router.get('/', async (req, res) =>{

    const customers = await Customer.find()
        .sort({name: 1})

    res.send(customers);
});

router.get('/:id', async (req, res) =>{
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send(`The customer for that id (${req.params.id}) doesn't exist.`);

    res.send(customer);
});

//POST
router.post('/', auth, async (req, res) => {
    //Validate
    let {error} = validate(req.body);
    if(error) return res.status(400).send(error.message);


    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    
    try{
        customer = await customer.save();
        res.send(customer);
    }
    catch(err){
        res.status(400).send(err)
    }
});

//PUT
router.put('/:id', auth, async (req, res) =>{
     //validate
     let {error} = validate(req.body);
     if(error) return res.status(400).send(error.message);

    //Checking the id entered
    const customer = await Customer.findByIdAndUpdate(req.params.id, {name: req.body.name, isGold: req.body.isGold, phone: req.body.phone}, {new: true});
    if(!customer) return res.status(404).send(`The customer for that id (${req.params.id}) doesn't exist.`);

    res.send(customer);
});

//DELETE
router.delete('/:id', auth, async (req, res) =>{
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if(!customer) return res.status(404).send(`The customer for that id (${req.params.id}) doesn't exist.`);

    res.send(customer);
});

module.exports = router;
