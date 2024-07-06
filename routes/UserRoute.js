
require('dotenv').config()
// setup an express router
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
var jwt = require('jsonwebtoken');
const User = require('../models/user')
// Signup route
router.post("/signup", async (req, res) => {

    try {
        const { name, email, pass } = await req.body
        const hashedPassword = bcrypt.hashSync(pass, 10)
        const newUser = await new User(
            {
                name: name,
                email: email,
                password: hashedPassword
            }
        )
        const user = await newUser.save()
        const token = await jwt.sign({ userId: user._id }, process.env.AUTH_SECRET_KEY, { expiresIn: '1h' })
        const { password, ...otherDetails } = await user._doc;
        otherDetails.token = token
        res.status(200).send(otherDetails);
    }
    catch (err) {
        res.status(400).send(err)
    }


})



// The login router
router.post("/login", async (req, res) => {
    try {
        const { email, password } = await req.body
        const user = await User.findOne({ email: email })
        // Check for users email
        if (!user) {
            res.send(`User with ${email} does not exist`)
        }
        // check for correct password
        if (bcrypt.compareSync(password, user.password)) {
            const token = await jwt.sign({ userId: user._id }, process.env.AUTH_SECRET_KEY, { expiresIn: '1h' })
            const { password, ...otherDetails } = await user._doc;
            otherDetails.token = token
            res.send(otherDetails);
        }
        else {
            res.send("invalid Password")
        }

    }
    catch (err) {
        res.status(400).send(err)
    }

})


const verifyToken = require("../middlewares/authMiddleware")
const { use } = require('bcrypt/promises')
// Protected route
router.get('/verify', verifyToken, (req, res) => {
    console.log(req.user.userId)
    res.status(200).json({ message: 'Protected route accessed' });
});

router.post('/test', verifyToken, (req, res) => {
    console.log(req.user)
    res.status(200).send("Ok")
})

router.put('/newinvoice', verifyToken, async (req, res) => {
    try {
        const userId = await req.user.userId
        const { clientName, clientEmail, invoiceItems } = req.body
        const user = await User.findById(userId)
        // check if invoice is empty
        if (!user.invoices) {
            user.invoices = req.body
            user.save()
        }
        else {
            user.invoices.push(req.body);
            user.save()
        }
        res.send(user)
    }
    catch (err) {
        res.send(err)
    }
})

module.exports = router;

