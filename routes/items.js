const mongoose = require('mongoose')
const Joi = require("joi");
const express = require('express');
const router = express.Router();

const Item = mongoose.model('Item', new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}))

//GET
router.get('/', async (req, res) => {
    const item = await Item.find().sort('name')
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
    const {error} = validateCourse(req.body)

    if(error) return res.status(400).send(error.details[0].message)

    let item = new Item({name: req.body.name})
    item = await item.save()

    res.send(item)
}); 

router.put('/:id', async (req, res) => {
     //validate
     const {error} = validateCourse(req.body)
     //If invalid, return 400 -Bad request
     if(error) return res.status(400).send(error.details[0].message)
    //Update Items
    const item = await Item.findByIdAndUpdate(req.params.id,  {name: req.body.name}, {new: true})
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

function validateCourse(course) { 
    //Validate
    const schema = {
        name: Joi.string().min(5).max(50).required()
    } 
    return Joi.validate(course, schema)
}

module.exports = router;