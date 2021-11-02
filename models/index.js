const Friend = require('./Friend');
const User = require('./User');
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

module.exports = {
  Friend,
  User,
  UserFriends
};

