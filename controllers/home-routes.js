const router = require('express').Router();
const {  User } = require('../models');

//Sends user to homepage
router.get('/', async (req, res) => {
    try{
        const myUser = await User.findByPk(req.session.user_id);
        res.render('homepage', {
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id,
            userName: myUser.username
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Sends user to login
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    // Otherwise, render the 'login' template
    res.render('login');
  });



router.get()