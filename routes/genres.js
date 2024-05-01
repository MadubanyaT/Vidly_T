const express = require('express');
const router = express.Router();
const {Genres, validate} = require('../models/genre');

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
router.post('/', async (req, res) => {
    //Validate
    let {error} = validate(req.body);
    if(error) return res.status(400).send(error.message);

    let genre = new Genres({
        name: req.body.name,
        description: req.body.description
    });
    
    try{
        genre = await genre.save();
        res.send(genre);
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
    const genre = await Genres.findByIdAndUpdate(req.params.id, {name: req.body.name, description: req.body.description}, {new: true});
    if(!genre) return res.status(404).send(`The genre for that id (${req.params.id}) doesn't exist.`);

    res.send(genre);
});

//DELETE
router.delete('/:id', async (req, res) =>{
    const genre = await Genres.findByIdAndDelete(req.params.id);
    if(!genre) return res.status(404).send(`The genre for that id (${req.params.id}) doesn't exist.`);

    res.send(genre);
});

module.exports = router;