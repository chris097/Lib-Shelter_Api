const express = require('express')
const router = express.Router();
const {UserInfo, validate} = require('../models/user')


//GET
router.get('/', async (req, res) => {
    const user = await UserInfo.find()
    res.send(user)
})

//POST
router.post('/', async (req, res) => {
    const {error} = validate(req.body)

    if(error) return res.status(400).send(error.details[0].message)

    let user = new UserInfo({
        name: req.body.name,
        userImage: req.body.userImage
    })
    user = await user.save()

    res.send(user)
}); 


module.exports = router;