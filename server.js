///DEPENDENCIES
require('dotenv').config()

const PORT = process.env.PORT || 4000

const express = require('express')

const app = express()

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const db = mongoose.connection

const Review = require('./models/reviews.js')

const reviewsController = require('./controllers/reviews.js')

///IMPORTING METHOD-OVERRIDDE FOR DELETION
const methodOverride = require('method-override')

/// USE METHOD-OVERRIDE
app.use(methodOverride(('_method')))

/// BODY PARSER CODE
app.use(express.json())

/// MIDDLEWARE
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use('/movies', reviewsController)

///LINKING TO DATABASE
mongoose.connect(process.env.DATABASE_URL)

// DATABASE CONNECTION/ ERRORS
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


///APP IS LISTENING...
app.listen(PORT, () => console.log(`Server is active on ${PORT}`))