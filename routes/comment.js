const express = require('express');
const router = express.Router();
const {Comments, validate} = require('../models/comment')

//GET
router.get('/', async (req, res) => {
    const comment = await Comments.find()
    res.send(comment)
})

//GET:id
router.get('/:id', async (req, res) =>{
    const comment = await Comments.findById(req.params.id)
    if(!comment) res.status(404).send('The items of the given ID was not found...')
    res.send(comment)
})

//POST
router.post('/', async (req, res) => {
    const {error} = validate(req.body)

    if(error) return res.status(400).send(error.details[0].message)

    let comment = new Comments({
        comment: req.body.comment,
        likes: req.body.likes,
    })
    comment = await comment.save()

    res.send(comment)
}); 

//PUT
router.put('/:id', async (req, res) => {
    //validate
    const {error} = validate(req.body)
    //If invalid, return 400 -Bad request
    if(error) return res.status(400).send(error.details[0].message)
   //Update Items
   const comment = await Comments.findByIdAndUpdate(
       req.params.id,  
       {
           comment: req.body.comment,
           likes: req.body.likes,
       },
       {new: true})
   //If not existing, return 404
   if(!comment) res.status(404).send('The items of the given ID was not found...')
   //Return the update Items
   res.send(comment)
})

//DELETE
router.delete('/:id', async (req, res) => {
    //find by id and remove
    const comment = await Comments.findByIdAndRemove(req.params.id)
      //If not existing, return 404
    if(!comment) res.status(404).send('The items of the given ID was not found...')
      //Return the same item
     res.send(comment)
})

module.exports = router;