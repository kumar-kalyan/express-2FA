const mongoose = require('mongoose')
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity cannot be less than 1.'],
        default: 1
    },
    price: {
        type: Number,
        required: true
    }
})
const invoiceSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    invoiceItems: [itemSchema]
})
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    invoices: [invoiceSchema]
})
module.exports = mongoose.model("users", userSchema)