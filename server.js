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
  res.render('home.ejs')
})

/// MIDDLEWARE
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use('/movies', reviewsController)
app.use('/users', usersController)

///LINKING TO DATABASE
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: false,
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
      }, {
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
      } , {
        title: 'Forest Gump',
        img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQvJZAr8HsQLqTb0cnw-2SaBI3-8GbmHLz778B-N7PhQZAvAcAU',
        genre: 'Epic/Drama',
        review: 'A young man from Alabama is thrust into an uncertain world like most of us yet he handles all obstacles that are thrown at him with effortless class despite the cards of life that he was dealt. This movie is filled with war, friendship, love and loss so get ready for an epic adventure.',
        streamingOn: ['Netflix'],
        tags: ['Adventure', 'War', 'Running', 'Friendship', 'Shrimp', 'Lt. Dan'],
        similarTo: ['The Shawshank Redemption', 'Castaway', 'Good Morning, Vietnam', 'A Beautiful Mind']
      } , {
        title: 'The Prestige',
        img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTRJH8xMbcPS3B6WoHjsjwghwn4seBH0VPxxKEBtUEBj8QS4S8x',
        genre: 'Drama/Thriller',
        review: 'Two up-and-coming magicians are hungry for success and will stop at nothing to achieve it. The movie focuses on the growing rivalry between these two magicians when one of them truly believes that he has been slighted by the other. This movie has elements of science-fiction as well as romance, although the romance is not exclusive to people because we see how the love and desire for success consumes them both.',
        streamingOn: ['Hulu'],
        tags: ['Magic', 'Rivalry', 'Science', 'Secrets', 'Obsession'],
        similarTo: ['The Illusionist', 'Inception', 'Shutter Island', 'Memento']
      } , {
        title: 'As Good As It Gets',
        img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRRIVGCywPutIbBFUSLPFOgUzz929zlagwD8kMxItxhcUUcD6mX',
        genre: 'Romance/Comedy',
        review: 'A well off writer living in the big city also has big problems, with everyone. Jack Nicholson plays this cranky writer who is plagued with OCD but he somehow ends up making every other person’s life that he encounters an absolute nightmare. He lives his daily life the exactly the same as the one before and that is not excluding when, where and who serves him food. One deviation for lead to an absolute meltdown. This all begins to change and his perspective on the world slowly softens as he finally allows people to enter into his true psyche.',
        streamingOn: ['Hulu'],
        tags: ['Mental Illness', 'Cranky', 'Writers', 'Love', 'Funny'],
        similarTo: ["Something's Gotta Give", 'Jerry Maguire', 'Terms of Endearment', 'Spanglish']
      } , {
        title: 'Jojo Rabbit',
        img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQoEwNJqlyB8C_7sEvqqJI0JeVjYbV21TYwUxPPi1tkfA9qF3pe',
        genre: 'Comedy/Drama',
        review: 'This movie follows a young man growing up in WWII Germany near the end of the war and it is apparent pretty quickly that he is severely lacking a father figure. His own father has gone off to fight in the war and is most likely not coming back but his mother is a rambunctious and livelily woman who is too positive for the world shes caged in. To fill the void of his absent father the boy finds the next closest thing to his father, or at least what he thought his father would embody. He creates himself an imaginary friend and with him discovers more about himself by through the disparities of his friendhsip.',
        streamingOn: ['Hulu', 'Sling TV'],
        tags: ['WWII', 'Dark Comedy', 'Germany', 'Coming-of-age', 'Friendship'],
        similarTo: ['The Book Thief', 'Knives Out', 'Richard Jewell', 'The Monuments Men']
      }
    ], (err, data) => {
      res.redirect('/movies')
    })

})


///APP IS LISTENING...
app.listen(PORT, () => console.log(`Server is active on ${PORT}`))