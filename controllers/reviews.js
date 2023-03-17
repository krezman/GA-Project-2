const express = require('express')

const router = express.Router()

const Review = require('../models/reviews.js')


/// RESTFUL ROUTES
// I.N.D.U.C.E.S.
/*
  INDEX -- /movies -- GET -- index.ejs
  NEW -- /movies/new -- GET -- new.ejs
  DESTROY -- /movies/:id -- DELETE -- no file associated
  UPDATE -- /movies/:id -- PUT -- no file associated
  CREATE -- /movies/ -- POST -- no file associated
  EDITS -- /movies/:id/edit -- GET -- edit.ejs
  SHOW -- /movies/:id -- GET -- show.ejs
*/

// CUSTOM MIDDLEWARE TO AUTHORIZE LOGGED IN USERS
const authRequired = (req, res, next) => {
  if (req.session.currentUser) {
    // a user is signed in
    next()
    // next is a part of express
    //it does what is says
  } else {
    res.render('visitor.ejs')
  
  }
}


/// ROUTES/CONTROLLERS
// INDEX
router.get('/', (req, res)=>{
  Review.find({}, (err, foundReviews) => {
		if (err) {
      console.log(err)}
		// console.log(foundProducts)
		res.render('index.ejs', {
			reviews: foundReviews
		})
	})
})

// NEW
router.get('/new', (req, res) => {
  res.render('new.ejs')
})


// DESTROY
router.delete('/:id', authRequired, (req, res) => {
  Review.findByIdAndDelete(req.params.id, (err, deletedReview) => {
    if (err) {
      console.log(err)
    } else {
      console.log(deletedReview)
      res.redirect("/movies")
    }
  })
})


// UPDATE
router.put('/:id', (req,res) =>{
  Review.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updatedReview) => {
    if (err) {
      console.log(err.message)
      res.send(err)
    } else {
      console.log(updatedReview)
    res.redirect(`/movies`)
    }
  })
})


// CREATE
router.post('/', (req, res) => {
  Review.create(req.body, (err, newReview) => {
    if (err) {
      console.log(err.message)
    } else {
      console.log(newReview)
      res.redirect('/movies')
    }
  })
})


// EDIT
router.get('/:id/edit', authRequired, (req, res) => {
	Review.findById(req.params.id, (err, foundReview) => {
		if(err) {
			console.log(err.message)
			res.send(err)
		} else {
			res.render('edit.ejs', {
				review: foundReview
			})
		}
	})
})



// SHOW
router.get('/:id', (req, res) => {
  Review.findById(req.params.id, (err, foundReview) => {
    if (err) {
      console.log(err)
    } else {
      res.render('show.ejs', {
        review: foundReview
      })
    }
  })
})




module.exports = router