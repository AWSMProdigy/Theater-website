const router = require('express').Router();
const { UserFriends, User, Friend } = require('../../models');

//Display pending friendships
router.get('/pending/:id', async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        include: [{ model: Friend, through: {
          where:{
            status: 1
          }
        }, as: 'list_friends'
        }],
      });

      const pendingFriends = userData.map((post) =>
      pendingFriends.get({ plain: true })
    );

    res.render('friend-list', {
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
      pendingFriends
    });
    }
    catch (err) {
      res.status(500).json(err);
    }
  });

//Accept/decline friendship
router.put('/:id', async (req, res) => {
    try{
      const updatedFriendship = await UserFriends.update(req.body, {
          where: {
              id: req.params.id
          }
      })
      if(updatedFriendship){
          res.status(200).json(updatedFriendship);
          return;
      } else{
            res.status(404).json({message:"Friendship does not exist to be accepted/declined"});
      }
    }
    catch (err){
      res.status(500).json(err);
    }
  })


//Send friend request
router.post('/', async (req, res) => {
try{
    const someUser_id = req.session.user_id;
    //Check to see that user exists
    const newFriend = await User.findOne({
      where: {
        username: req.body.username
      }
    });
    if(!newFriend){
    res.status(404).json({ message: "No friend found" });
    }
    console.log(newFriend.id + "------------------------");
    const newFriendship = await UserFriends.create({
        user_id: someUser_id,
        friend_id: newFriend.id,
        status: 1
    });
    
    req.session.save(() => {
      loggedIn = true;
      user_id = req.session.user_id;
      res.status(200).json(newFriendship);
    });
}
catch (err){
    res.status(500).json(err);
}
})


//Delete friend
router.delete('/:id', async (req, res) => {
    try{
        const deletedFriendship = await Category.destroy({
            where: {
                id: req.params.id
            }
        })
        if(deletedFriendship){
            res.status(200).json(deletedFriendship);
            return;
        } else {
            res.status(404).json({message:"Friendship does not exist to be deleted"});
            return;
        }
    } catch(err){
        res.status(500).json(err);
        return;
      }
})

module.exports = router;