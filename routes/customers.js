const express = require('express');
const router = express.Router();
const {Customer: Customers, validate} = require('../models/customer');


router.get('/', async (req, res) =>{

    const customers = await Customers.find()
        .sort({name: 1})

    res.send(customers);
});

router.get('/:id', async (req, res) =>{
    const customer = await Customers.findById(req.params.id);
    if(!customer) return res.status(404).send(`The customer for that id (${req.params.id}) doesn't exist.`);

    res.send(customer);
});

//POST
router.post('/', async (req, res) => {
    //Validate
    let {error} = validate(req.body);
    if(error) return res.status(400).send(error.message);


    let customer = new Customers({
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
router.put('/:id', async (req, res) =>{
     //validate
     let {error} = validate(req.body);
     if(error) return res.status(400).send(error.message);

    //Checking the id entered
    const customer = await Customers.findByIdAndUpdate(req.params.id, {name: req.body.name, isGold: req.body.isGold, phone: req.body.phone}, {new: true});
    if(!customer) return res.status(404).send(`The customer for that id (${req.params.id}) doesn't exist.`);

    res.send(customer);
});

//DELETE
router.delete('/:id', async (req, res) =>{
    const customer = await Customers.findByIdAndDelete(req.params.id);
    if(!customer) return res.status(404).send(`The customer for that id (${req.params.id}) doesn't exist.`);

    res.send(customer);
});

module.exports = router;
