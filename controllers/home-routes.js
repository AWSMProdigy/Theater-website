const router = require('express').Router();
const {  User, Friend } = require('../models');

//Sends user to homepage
router.get('/', async (req, res) => {
    try{
      if(req.session.user_id){
        const myUser = await User.findByPk(req.session.user_id);
        res.render('homepage', {
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id,
            userName: myUser.username
        });
      } else {
        res.render('homepage', {
          loggedIn: false,
      });
      }
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

      const pendingData = await User.findByPk(req.session.user_id, {
        include: [{ model: Friend, through: {
          where:{
            status: 1
          }
        }, as: 'list_friends'
        }],
      });
      if (!userData) {
        res.status(404).json({ message: 'No User found with this id!' });
        return;
      }
      const myUser = userData.get({ plain: true });
      const myPending = pendingData.get({ plain: true });
      console.log(myPending);
      res.render('friends-list', {
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id, 
        myUser, 
        myPending
      });
    }
    catch (err) {
      res.status(500).json(err);
    }
  });



  module.exports = router;