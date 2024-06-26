
const { signUp, login } = require('../controllers/authController')
// setup an express router
const express = require('express')
const router = express.Router()
// The login router
router.post("/login", async (req, res) => {
    try {
        const { email, password } = await req.body
        const result = await login(email,password);
       
            res.status(200).send(result)
    }
    catch (err) {
        res.status(400).send(err)
    }

})
router.post("/signup", async (req, res) => {

    try {
        const { name, email, password } = await req.body
        const result = await signUp(name, email, password);
        res.status(200).json(result)
    }
    catch (err) {
        res.status(400).send(err)
    }


})


module.exports = router