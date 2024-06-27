require('dotenv').config()
// import mongoose and connect with databas
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CONNECTION_URI);
const { Schema } = mongoose;
//create user schema 
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})
// create user model
const userModel = mongoose.model("User", userSchema)
// create and save a new user 
const signUp = async (name, email, password) => {
    try {
        const newUser = await new userModel(
            {
                name: name,
                email: email,
                password: password
            }
        )
        const res = await newUser.save()
        return res
    }
    catch (err) {
        return err.errmsg
    }
}

const login = async (email, password) => {
    try {
        const status = await userModel.findOne({ email: email, password: password })
        if (status) {
            return status
        }
        else {
            return "Invalid User ID or Password"
        }
    }
    catch (err) {
        return err.errmsg
    }
}

module.exports = { signUp, login }