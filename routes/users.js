const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router()
const _ = require('lodash');
const bcryptjs = require('bcryptjs');
const auth = require('../middleware/auth'); //authorization
// const passwordComplexity = require("joi-password-complexity") //used to create password complex


router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).sort('name').select(['-password']);

    res.send(user);
});


router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    try{
        const salt = await bcryptjs.genSalt(12);
        user.password = await bcryptjs.hash(user.password, salt)
        user = await user.save();
      
       const token = user.generateAuthToken();
       // res.send(_.pick(user, ['name', 'email'])); 
       res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']))
    }
    catch(err){
        return res.status(500).send('something went wrong');
    }
})

// router.get('/:id', async (req, res) => {
//     const user = await User.findById(req.params.id);
//     if(!user) return res.status(404).send(`User with this ${req.params.id} id does not exist`);

//     res.send(user);
// });

// router.put('/:id', async (req, res) => {
//     const {error} = validate(req.body);
//     if(error) return res.status(400).send(error.message);

//     const user = await User.findByIdAndUpdate(req.params.id, {name: req.body.name, email: req.body.email, password: req.body.password}); 
//     if(!user) return res.status(404).send(`User with this ${req.params.id} id does not exist`);

//     res.send(user);  
// });

// router.delete('/:id', async (req, res) => {
//     const user = await User.findByIdAndDelete(req.params.id)
//     if(!user) return res.status(404).send(`User with this ${req.params.id} id does not exist`);

//     res.send(user);
// });


module.exports = router