const router = require('express').Router();
const {  User, Friend, UserFriends, Movie } = require('../models');

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

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('signup');
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
        },
        { model: Movie, as: "movies" }
      ],
      });

      const pendingData = await User.findByPk(req.session.user_id, {
        include: [{ model: Friend, through: {
          where:{
            status: 1
          }
        }, as: 'list_friends'
        }],
      });

      const incomingData = await UserFriends.findAll({
          where:{
            status: 1,
            friend_id: req.session.user_id
          }
      });
      
      var incomingFriends = [];
      for(let i=0; i < incomingData.length; i++){
        incomingFriends.push(await User.findByPk(incomingData[i].user_id));
      }

      if (!userData) {
        res.status(404).json({ message: 'No User found with this id!' });
        return;
      }

      const myUser = userData.get({ plain: true });
      const myPending = pendingData.get({ plain: true });

      console.log(incomingFriends);

      res.render('friends-list', {
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id, 
        myUser, 
        myPending,
        incomingFriends
      });
    }
    catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/profile/:username', async (req, res) => {
    try {
      const userData = await User.findOne({
        where: {
          username: req.params.username
        },
      });
  
      if (!userData) {
        res.status(404).json({ message: 'No User found with this id!' });
        return;
      }
      const myUser = userData.get({ plain: true });
      res.render('friend-profile', {
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id, 
        myUser
      });
    }
    catch (err) {
      res.status(500).json(err);
    }
  });



  module.exports = router;