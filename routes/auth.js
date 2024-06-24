// setup an express router
const express = require('express')
const router = express.Router()
// The login router
router.post("/login", (req, res) => {
    const { email, pass } = req.body
    res.status(200).json({
        email: email,
        pass: pass
    })
})
router.post("/signup", (req, res) => {
    const { name, email, pass } = req.body
    res.status(200).json({
        name: name,
        email: email,
        pass: pass
    })
})

module.exports = router