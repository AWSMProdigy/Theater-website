const router = require('express').Router();
const { UserFriends, User, Friend } = require('../../models');

//Display pending friendships
router.get('/:id', async (req, res) => {
    try {
      const userData = await User.findByPk(req.params.id, {
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
      res.status(200).json(userData);
    }
    catch (err) {
      res.status(500).json(err);
    }
  });

//Accept/decline friendship
router.put('/:id', async (req, res) => {
    try{
      const updatedFriendship = UserFriends.update(req.body, {
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

router.post('/:id', async (req, res) => {
try{
    const someUser_id = req.body.user_id;
    //Check to see that user exists
    const newFriend = await User.findByPk(req.params.id);
    if(!newFriend){
    res.status(404).json({ message: "No friend found" });
    }
    const newFriendship = await UserFriends.create({
        user_id: someUser_id,
        friend_id: newFriend.id,
        status: 1
    });
    
    res.status(200).json(newFriendship);
}
catch (err){
    res.status(500).json(err);
}
})

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