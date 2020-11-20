const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json())

Items = [
    {
        id: 1, 
        name: "course1",
    },
    {
        id: 2, 
        name: "course2"
    }
]

//GET
app.get('/api/items', (req, res) => {
    res.send(Items)
})

//GET:id
app.get('/api/items/:id', (req, res) =>{
    const item = Items.find(c => c.id === parseInt(req.params.id))
    if(!item) res.status(404).send('The items of the given ID was not found...')
    res.send(item)
})

//POST
app.post('/api/items', (req, res) => {
    const {error} = validateCourse(req.body)

    if(error) return res.status(400).send(error.details[0].message)

    const item = {
        id: Items.length +1,
        name: req.body.name
    }
    Items.push(item)
    res.send(item)
})

app.put('/api/items/:id', (req, res) => {
    //Look up the Items
    const item = Items.find(c => c.id === parseInt(req.params.id))
    //If not existing, return 404
    if(!item) res.status(404).send('The items of the given ID was not found...')
    //validate
    const {error} = validateCourse(req.body)
    //If invalid, return 400 -Bad request
    if(error) return res.status(400).send(error.details[0].message)
    //Update Items
    item.name =req.body.name
    //Return the update Items
    res.send(item)
})

app.delete('/api/items/:id', (req, res) => {
      //Look up the Items
      const item = Items.find(c => c.id === parseInt(req.params.id))
      //If not existing, return 404
      if(!item) res.status(404).send('The items of the given ID was not found...')
      //Delete
      const index = Items.indexOf(item)
      Items.splice(index, 1)
      //Return the same item
      res.send(item)
})

function validateCourse(course) { 
    //Validate
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}


//Environment Variable
const port = process.env.PORT || 4040;
app.listen(port, console.log(`Listening on port ${port}...`))