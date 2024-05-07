const express = require('express');
const router = express.Router();
const {Genres, validate} = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', async (req, res) =>{

    const genres = await Genres.find()
        .sort({name: 1})

    res.send(genres);
});

router.get('/:id', async (req, res) =>{
    const genre = await Genres.findById(req.params.id);
    if(!genre) return res.status(404).send(`The genre for that id (${req.params.id}) doesn't exist.`);

    res.send(genre);
});

//POST
router.post('/', auth, async (req, res) => {
    //The user must be authenticated to use this http method
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send('User is not authenticated for this request.');

    //Validate
    let {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre = new Genres({
        name: req.body.name,
        description: req.body.description
    });
    
    try{
        genre = await genre.save();
        res.send(genre);
    }
    catch(err){
        res.status(500).send(err)
    }
});

//PUT
router.put('/:id', auth, async (req, res) =>{
    //validate
     let {error} = validate(req.body);
     if(error) return res.status(400).send(error.message);

    //Checking the id entered
    const genre = await Genres.findByIdAndUpdate(req.params.id, {name: req.body.name, description: req.body.description}, {new: true});
    if(!genre) return res.status(404).send(`The genre for that id (${req.params.id}) doesn't exist.`);

    res.send(genre);
});

//DELETE
router.delete('/:id', [auth, admin], async (req, res) =>{
    const genre = await Genres.findByIdAndDelete(req.params.id);
    if(!genre) return res.status(404).send(`The genre for that id (${req.params.id}) doesn't exist.`);

    res.send(genre);
});

module.exports = router;