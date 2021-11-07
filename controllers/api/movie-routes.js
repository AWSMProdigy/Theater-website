const router = require('express').Router();
const { Movie, User } = require('../../models');

// CREATE new movie
router.post('/', async (req, res) => {
  try {
    const dbMovieData = await Movie.create({
      title: req.body.title,
      runtime: req.body.runtime,
      rating: req.body.rating,
      showtime: req.body.showtime,
      user_id: req.session.user_id
    });
    if(dbMovieData){
      res.status(200).json(dbMovieData);
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
    try {
      const movieData = await Movie.findByPk(req.params.id);
  
      if (!movieData) {
        res.status(404).json({ message: 'No movie found with this id!' });
        return;
      }
      res.status(200).json(movieData);
    }
    catch (err) {
      res.status(500).json(err);
    }
  });

      

router.get('/', async (req, res) => {
  try {
    const movieData = await Movie.findAll();

    if (!movieData) {
      res.status(404).json({ message: 'No movies in database' });
      return;
    }
    res.status(200).json(movieData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/theater', async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: { 
        id: req.session.user_id 
      }
    });
    if(!updatedUser) {
      res.status(404).json({message: "User does not exist to be updated"})
    } else {
      res.status(200).json(updatedUser);
    }
  }
  catch (err) {
    res.status(500).json(err);
    return;
  }
})

module.exports = router;