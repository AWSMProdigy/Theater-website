const router = require('express').Router();
const { Movie } = require('../../models');

// CREATE new movie
router.post('/', async (req, res) => {
  try {
    const dbMovieData = await Movie.create({
      title: req.body.title,
      runtime: req.body.runtime,
      rating: req.body.rating,
      showtime: req.body.showtime
    });

    router.get('/:id', async (req, res) => {
        try {
          const movieData = await Movie.findByPk(req.params.id);
      
          if (!movieData) {
            res.status(404).json({ message: 'No User found with this id!' });
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
          const movieData = await Movie.findall();
      
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
  
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
