/// DEPENDENCIES/VARIABLES
const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()

const User = require('../models/user.js')

/// ROUTES FOR USER

// MAKE AN ACCOUNT
router.get('/register', (req, res) => {
  res.render('users/register.ejs')
})

// CREATING A NEW USER
router.post('/register', (req, res) => {
  const salt = bcrypt.genSaltSync(10)
  req.body.password = bcrypt.hashSync(req.body.password, salt)
  User.findOne({username: req.body.username}, (err, userExists) => {
    if (userExists) {
      res.send('Sorry that user name is taken.')
    } else {
      User.create(req.body, (err, createdUser) => {
        console.log(createdUser)
        req.session.createdUser = createdUser
        res.redirect('/movies')
      })
    }
  })
})


// GENERATING THE USER LOGIN PAGE
router.get('/login', (req, res) => {
  res.render('users/login.ejs')
})


// CONFIRMING THE LOGIN INFO
  router.post('/login', (req, res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
      if (foundUser) {
        const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
      if (validLogin) {
        req.session.currentUser = foundUser
        console.log(foundUser)
        res.redirect('/movies')
        } else {
          res.send('Invalid username or paswword.')
        }
      } else {
        res.send('Invalid username or password.')
      }
    })
  })


  // DESTROY SESSION ROUTE
  router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/movies')
  })

  module.exports = router