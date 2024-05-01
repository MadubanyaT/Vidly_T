const Joi = require('joi');
const mongoose = require('mongoose');


const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: { 
        type: String,
        minlength: 3,
        maxlegnth: 100,
        requred: true,
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        minlength: 10,
        maxlegnth: 10,
        required: true
    }
}));

function ValidateCustomer(customer){
    const schema = Joi.object({
        name: Joi.string().min(2).max(200).required(),
        phone: Joi.string().min(10).max(10).required(),
        isGold: Joi.boolean()
    });
    return schema.validate(customer);
};

module.exports.Customer = Customer;
module.exports.validate = ValidateCustomer;
