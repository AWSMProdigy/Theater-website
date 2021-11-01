const User = require('./User');
const Movie = require('./Movie');

User.belongsToMany(Movie, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Trip,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'planned_trips'
});

Movie.belongsToMany(User, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Trip,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'movie_users'
});

module.exports = { User, Movie, Trip };