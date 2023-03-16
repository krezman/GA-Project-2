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
const usersController = require('./controllers/users.js')

const session = require('express-session')

const SESSION_SECRET = process.env.SESSION_SECRET
console.log(SESSION_SECRET)

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

///IMPORTING METHOD-OVERRIDDE FOR DELETION
const methodOverride = require('method-override')

/// USE METHOD-OVERRIDE
app.use(methodOverride(('_method')))

/// BODY PARSER CODE
app.use(express.json())

/// HOME ROUTE FOR HEROKU
app.get('/', (req, res) => {
  res.redirect('/movies')
})

/// MIDDLEWARE
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use('/movies', reviewsController)
app.use('/users', usersController)

///LINKING TO DATABASE
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  useNewParser: false,
})

// DATABASE CONNECTION/ ERRORS
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


///SEED
app.get('/reviews/seed', (req, res) => {
  Review.create([
      {
        title: 'The Ledgend of Bagger Vance',
        img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQPYcHH0IMXlAMivvA9RUFW9bNVDEAQIUB5NVnFNRu-CDohr-La',
        genre: 'Sport/Drama',
        review: 'This is an awesome movie for those who really enjoy epic tales with tall-tale elements interwoven into the fabric of the story itself. It is based on a true story narrated by a man who is recounting his childhood and the inception of his love for the game of golf. He focuses on his childhood idol who was a natural talent in the game of golf, Rannulph Junuh (played by Matt Damon), before he was sent off to go fight in WWI. Now that he has returned and there is a local tournament being held he is apprehensively willed back into the game by his local community and finds more than just his club stroke by the end of it all. Not without the help of a mysterious caddie though played by Will Smith.',
        tags: ['Epic', 'Sports', 'Golf', 'Uplifting', 'redemption', 'For the love of the game'],
        similarTo: ['The Greatest Game Ever Played', 'Big Fish', 'Tin Cup', 'The Natural']
      }
      , {
        title: 'A River Runs Through It',
        img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTJRW1bQ-aRELKWiO9Ev-qx27_ri9jP5xa7RsRCLwGBFYjqjjb_',
        genre: 'Drama/Indie Film',
        review: 'This movie follows the tale of two brothers who are growing up in rural Montana in the early 1900\’s with a father that is also the local reverend. There father instills early on a deep appreciation for God, family and fly fishing and those pillars have a unique way of shaping each brother in their own way as time passes. Throughout the film we see these brothers grow up and both become writers in their own way. One brother leaning towards the finality of journalistic endeavors while the other espouses poetry and romantic ways of detailing reality. It becomes clear as the movie progresses though that each brother conducts their own life in a juxtaposed manner though which inevitably develops the deep rifts that still remain in each of their own lives.',
        streamingOn: ['Hulu', 'Amazone Prime', 'Sling TV', 'YouTube', 'fuboTV', 'Paramount+'],
        tags: ['Family Drama', 'Brothers', 'Prohabition Era', 'Journalism', 'Americana'],
        similarTo: ['Legends of the Fall', 'Warrior', 'The Power of the Dog', 'Seven Years in Tibet']
      } , {
        title: 'Interstellar',
        img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQUw076GR7JpnfExoBLTMpiE9otUzk518SylUdC1roF6Ah63NS9',
        genre: 'Sci-Fi/Adventure',
        review: 'Interstellar might be a cautionary tale with it opening up in the year of 2067 where earth has been falling into a chasm of global famine for years and as humanity falls deeper and deeper into this problem it becomes evident that there is no solution. As humanity has seemingly poured all its remaining resources into fixing the famine the fear of an alternative solution growing further out of reach becomes the main focal point of this film. The movie follows a retired NASA pilot who has been unexplainably been led to earth’s last space exploration research center and is tasked with leading a crew into the unknown as they search for humanity’s last hope at survival. The pilot (played by Matthew McConaughey) and the rest of the crew leave behind everything in hopes of saving everything.',
        streamingOn: ['Hulu', 'Amazone Prime', 'Sling TV', 'YouTube', 'Roku', 'Paramount+'],
        tags: ['Space', 'Sacrifice', 'Women Empowerment', 'Adventure'],
        similarTo: ['The Martian', 'Gravity', '2001: A Space Odyssey', 'Inception']
      }
    ], (err, data) => {
      res.redirect('/movies')
    })

})


///APP IS LISTENING...
app.listen(PORT, () => console.log(`Server is active on ${PORT}`))