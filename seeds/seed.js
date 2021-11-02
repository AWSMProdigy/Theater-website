const sequelize = require('../config/connection');
const { User, Friend, UserFriends } = require('../models');

const friendSeedData = require('./friendSeedData.json');
const userSeedData = require('./userSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeedData);

  const friends = await Friend.bulkCreate(friendSeedData);

  // Create trips at random
  for (let i = 0; i < 3; i++) {
    // Get a random traveller's `id`
    const { id: someUser_id } = users[0];
    const { id: someFriend_id } = friends[i+1];

    // Create a new trip with random `trip_budget` and `traveller_amount` values, but with ids selected above
    await UserFriends.create({
      user_id: someUser_id,
      friend_id: someFriend_id,
      status: 1
    }).catch((err) => {
      // If there's an error, such as the same random pairing of `traveller.id` and `location.id` occurring and we get a constraint error, don't quit the Node process
      console.log(err);
    });
  }

  process.exit(0);
};

seedDatabase();
