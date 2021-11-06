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

//Accept friendship
router.put('/', async (req, res) => {
  //Find other user to get their id
    try{
      const otherFriend = await User.findOne({
        where: {
          username: req.body.userName
        }
      })
      console.log("------ Other friend found ------");
      //Use current user id with the id of the user of the incoming request to change the status and accept the friend request
      const updatedFriendship = await UserFriends.update(
          {status: 2},
          {where: {
              user_id: otherFriend.id,
              friend_id: req.session.user_id
          }}
      )
      console.log("------ Friendship updated ------");
      //Need to find other user and create a UserFriend relationship for them
      const otherFriendship = await UserFriends.create({
        user_id: req.session.user_id,
        friend_id: otherFriend.id,
        status: 2
      })
      console.log("------ Other friendship created ------");
      if(updatedFriendship && otherFriendship){
        req.session.save(() => {
          loggedIn = true;
          user_id = req.session.user_id;
          res.status(200).json(updatedFriendship);
        });
      } else{
            res.status(404).json({message:"Friendship does not exist to be accepted"});
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


//Delete existing friend
router.delete('/', async (req, res) => {  
    try{
      const otherFriend = await User.findOne({
        where: {
          username: req.body.userName
        }
      })
        const deletedFriendship = await UserFriends.destroy({
            where: {
                user_id: req.session.user_id,
                friend_id: otherFriend.id
            }
        })
        const otherDeletion = await UserFriends.destroy({
          where: {
              user_id: otherFriend.id,
              friend_id: req.session.user_id
          }
        })
        if(deletedFriendship && otherDeletion){
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

//Decline incoming friend request
router.delete('/incoming', async (req, res) => {
  try{
    const otherFriend = await User.findOne({
      where: {
        username: req.body.userName
      }
    })
    const otherDeletion = await UserFriends.destroy({
      where: {
          user_id: otherFriend.id,
          friend_id: req.session.user_id
      }
    })
    if(otherDeletion){
        res.status(200).json(otherDeletion);
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