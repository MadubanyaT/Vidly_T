const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 200
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024  /*Hashed password because I'll be storing it in the database*/
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});


// Used to create methods in a schema
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        email: Joi.string().min(4).max(200).required().email(),
        password: Joi.string().min(6).max(255).required() /*sent as plain text*/
     });

     return schema.validate(user);
  };

  module.exports.validate = validateUser;
  module.exports.User = User;