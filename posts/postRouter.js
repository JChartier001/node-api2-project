const express = require('express');
const router = express.Router();


const posts = require('../data/db.js');

router.use(express.json());

router.get('/', (req, res) => {
    posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({errorMessage: "Error in retrieving posts."})
    })
})

router.post('/', (req, res) => {
// const text= req.params.text;
// const content = req.params.contents;

    posts.insert(req.body)
    .then(message => {
        if(title && contents){
            res.status(201).json(message)
                        
        } else{
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
})

router.post('/:id/comments', (req, res) => {
    posts.insertComment(req.body)
    .then(comment => {
        
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    })
})

module.exports = router;