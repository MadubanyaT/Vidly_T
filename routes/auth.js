const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcryptjs = require('bcryptjs');
const Joi = require('joi');

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcryptjs.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');
    //today
   const token = user.generateAuthToken();
    res.send(token);
});

function validate(user) {
    const schema = Joi.object({
        email: Joi.string().min(4).max(200).required().email(),
        password: Joi.string().min(6).max(255).required() /*sent as plain text*/
     });

     return schema.validate(user);
  };

module.exports = router;