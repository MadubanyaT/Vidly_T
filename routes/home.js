const express = require('express');
const router = express.Router();

//GET
router.get('/', (req, res) =>{
    res.send('<h2>Welcome to Vidly<h/2>');
});

module.exports = router;