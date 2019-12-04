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
const postData = req.body;
if(postData.title || postData.contents === null){
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })                    
}   else{
posts.insert(postData)
    .then(postData => {
            res.status(201).json(postData);    
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    });}
});


router.post('/:id/comments', (req, res) => {
    const blog = posts.findById((blogId) => blogId.id === id);
    const id = req.params.id;
    const comment = req.body;

    if(!blog){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else if(!comment.text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }
    else{
    posts.insertComment(comment)
    .then(comment => {
        
            res.status(201).json(comment);
        
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    });}
});

router.get('/:id/comments', (req, res) => {
    const { id } = req.params;
    posts.findById(id)
        .then(post => {
            if (post.length) {
                posts.findPostComments(id)
                    .then(comments => {
                        res.status(200).json(comments);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            } else {
                res.status(404).json({error: 'The post with the specified ID does not exist.'})
            }})
        .catch(error => {
            res.status(500).json({error: 'The comments information could not be retrieved'})
        })      
})


router.delete('/:id', (req, res) => {  
    const { id } = req.params;
    posts.findById(id)
        .then(post => {
            if (post.length) {
                posts.remove(id)
                    .then(deleted => {
                        res.status(200).json(id);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            } else {
                res.status(404).json({error: 'The post with the specified ID does not exist.'})
            }})
        .catch(error => {
            res.status(500).json({error: 'The comments information could not be retrieved'})
        })      
});

router.put('/:id', (req, res) => {  
    const { id } = req.params;
    const changes = req.body;
    console.log(changes)
    posts.findById(id)
        .then(post => {            
            if (!changes.title || !changes.contents) {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
                } else if (posts.length === 0){
                    res.status(404).json({error: 'The post with the specified ID does not exist.'})
                } else {
                posts.update(id, changes)
                console.log(changes)
                .then(post => {
                        res.status(200).json(changes);
                    })
                .catch(error => {
                    console.log(error);
                    })
            }
            })
        .catch(error => {
            res.status(500).json({error: 'The comments information could not be retrieved'})
        })      
});



module.exports = router;