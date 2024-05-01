const Joi = require('joi');
const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
   },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlenth: 2000
    }
});

const Genres = mongoose.model('Genre', genreSchema );

function ValidateGenre(genre){
    const schema = Joi.object({
       name: Joi.string().min(2).max(200).required(),
       description: Joi.string().min(10).max(500).required()
    });
    return schema.validate(genre);
};

exports.genreSchema = genreSchema;
exports.validate = ValidateGenre;
exports.Genres = Genres