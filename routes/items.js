const express = require('express');
const router = express.Router();
const {Item, validate} = require('../models/items');

//GET
router.get('/', async (req, res) => {
    const item = await Item.find()
    res.send(item)
})

//GET:id
router.get('/:id', async (req, res) =>{
    const item = await Item.findById(req.params.id)
    if(!item) res.status(404).send('The items of the given ID was not found...')
    res.send(item)
})

//POST
router.post('/', async (req, res) => {
    const {error} = validate(req.body)

    if(error) return res.status(400).send(error.details[0].message)

    let item = new Item({
        author: req.body.author,
        title: req.body.title,
        description: req.body.description,
        bookUrl: req.body.bookUrl,
        isPublished: req.body.isPublished,
        ISBN: req.body.ISBN
    })
    item = await item.save()

    res.send(item)
}); 

router.put('/:id', async (req, res) => {
     //validate
     const {error} = validate(req.body)
     //If invalid, return 400 -Bad request
     if(error) return res.status(400).send(error.details[0].message)
    //Update Items
    const item = await Item.findByIdAndUpdate(
        req.params.id,  
        {
            author: req.body.author,
            title: req.body.title,
            description: req.body.description,
            bookUrl: req.body.bookUrl,
            isPublished: req.body.isPublished,
            ISBN: req.body.ISBN
        },
        {new: true})
    //If not existing, return 404
    if(!item) res.status(404).send('The items of the given ID was not found...')
    //Return the update Items
    res.send(item)
})

router.delete('/:id', async (req, res) => {
    //find by id and remove
    const item = await Item.findByIdAndRemove(req.params.id)
      //If not existing, return 404
    if(!item) res.status(404).send('The items of the given ID was not found...')
      //Return the same item
     res.send(item)
})

module.exports = router;