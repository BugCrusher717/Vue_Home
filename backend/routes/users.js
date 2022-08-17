const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/signIn', async (req, res) => {
    console.log(req.body)
    try {
        User.findOne({ email: req.body.email })
            .exec((err, user) => {
                // if (err) { res.status(500).send({ message: err }) };
                console.log(user)
                if (!user)
                    return res.status(404).json({ status_code: 0, message: "User not found!" })
                passwordValid = bcrypt.compareSync(req.body.password, user.password)                

                if (!passwordValid) {                    
                    return res.status(401).json({ status_code: 0, message: "WrongPassword!" })
                }
                return res.json({ status_code: 1, message: "Sucessed" })
            })
    } catch (err) {
        return res.status(403).json({ message: "Failed Login", error: err })
    }
});

router.get('/signIn', async(req,res) => {
    try {
        console.log(req.query)
        let user = await User.findOne({ email: req.query.email })
        if(user == null)
            res.json({message: "User Email is not authenticated"})
        else    res.json({message: "success"})
    } catch (err) {
        return res.json({ message: "Failed to retrieve weather Information", error: err });
    }
})

router.post('/signUp', async (req, res) => {
    let user = new User({
        username: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })
    if (User.findOne({ email: user.email }))
        res.status(403).json({message: "There's same email user. Please use another email"})
    else {
        try {
            let newUser = await user.save();
            res.json({ message: "Register Success!" });
        } catch (err) {
            res.send({ message: "Failed to Register", error: err });
        }
    }
});

module.exports = router;