const Friend = require('./Friend');
const User = require('./User');
const Movie = require('./Movie');

const UserFriends = require('./UserFriends');

Friend.belongsToMany(User, {
  // Define the third table needed to store the foreign keys
  through: {
    model: UserFriends,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'Friends_list'
});

User.belongsToMany(Friend, {
  // Define the third table needed to store the foreign keys
  through: {
    model: UserFriends,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'list_friends'
});

User.hasMany(Movie,{
  foreignKey: 'user_id'
});

Movie.belongsTo(User, {
  foreignKey: 'user_id'
})

module.exports = {
  Friend,
  User,
  UserFriends,
  Movie
};