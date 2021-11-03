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

//Get user profile of current user
router.get('/profile', async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        include: [{ model: Friend, through: {
          where:{
            status: 2
          }
        }, as: 'list_friends'
        }],
      });
  
      if (!userData) {
        res.status(404).json({ message: 'No User found with this id!' });
        return;
      }
      const myUser = userData.map((posts) =>
        posts.get({ plain: true })
      );
      res.render('friend-details', {
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id, 
        myUser
      });
    }
    catch (err) {
      res.status(500).json(err);
    }
  });



router.get()