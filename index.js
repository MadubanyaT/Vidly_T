const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json()); //middleware

const genres = [
    {id: 1, name: "Horror"},
    {id: 2, name: "Comedy"},
    {id: 3, name: "Thriller"},
    {id: 4, name: "Action"},
]

//GET
app.get('/', (req, res) =>{
    res.send('Welcome to Vidly!');
});

app.get('/api/genres', (req, res) =>{
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) =>{
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`The genre for that id (${req.params.id}) doesn't exist.`)

    res.send(genre);
});

//POST
app.post('/api/genres', (req, res) => {
    //Validate
    let {error} = ValidateGenre(req.body.name);
    if(error) return res.status(400).send(error);

    const newGenre = {id: genres.length + 1, name: req.body.name};
    genres.push(newGenre);

    res.send(newGenre);
});

//PUT
app.put('/api/genres/:id', (req, res) =>{
    //Checking the id entered
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`The genre for that id (${req.params.id}) doesn't exist.`);

    //validate
    let {error} = ValidateGenre(req.body.name);
    if(error) return res.status(400).send(error);

    //update the genre
    genre.name = req.body.name;
    res.send(genre);
});

//DELETE
app.delete('/api/genres/:id', (req, res) =>{
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`The genre for that id (${req.params.id}) doesn't exist.`);

    //Delete
    let index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
})


function ValidateGenre(genre){
    const schema = Joi.string().min(2).max(200).required();
    return schema.validate(genre)
}


//PORT
const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`Listening on port ${port}...`));