// Creating an experess application
require("dotenv").config
const expess = require('express')
const app = expess()
const cors = require('cors');
const bodyParser = require('body-parser');
// Import routes
const userRoutes = require("./routes/UserRoute")
// use of  bodyparser middlewhere
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// import mongoose and connect with databas


const corOption = {
    origin: (origin, callback) => {
        // Allow request for no origin like moblie or CURL
        if (!origin) return callback(null, true)
        const isHttps = origin.startsWith("https://")
        if (isHttps) {
            // Request Allowed
            callback(null, true)
        }
        // Request Rejected
        else {
            callback(new Error("Only HTTPS requests are allowed"))
        }
    },
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization',]

}


app.get("/", (req, res) => {
    res.status(200).json({ hx: "Hello World !" })
})
// Routes
app.use('/auth', userRoutes)
app.use(cors(corOption))
const Port = process.env.PORT || 5000

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CONNECTION_URI).then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });;
app.listen(Port, () => {
    console.log(`Listning on port ${Port}`)
})