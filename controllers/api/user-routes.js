const router = require('express').Router();
const { User, Friend, UserFriends } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const newFriend = await Friend.create({
      user: req.body.username
    })

    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
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
    res.status(200).json(userData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});


router.get('/friend/:id', async (req, res) => {
  try {
    const userData = await Friend.findByPk(req.params.id, {
      include: [{ model: User, through: UserFriends, as: 'Friends_list' }]
    });

    if (!userData) {
      res.status(404).json({ message: 'No Friend found with this id!' });
      return;
    }
    res.status(200).json(userData);
  }
  catch (err) {
    res.status(500).json(err);
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    // Once the user successfully logs in, set up the sessions variable 'loggedIn'
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// router.post('/friend/:id', (req, res) => {

// })

module.exports = router;
