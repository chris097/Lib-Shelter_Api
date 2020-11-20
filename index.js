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
    const item = {
        id: Items.length +1,
        name: req.body.name
    }
    Items.push(item)
    res.send(item)
})



const port = process.env.PORT || 4040;
app.listen(port, console.log(`Listening on port ${port}...`))