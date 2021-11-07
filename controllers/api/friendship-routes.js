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
        });
        res.redirect(200, '/');
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
    const newFriend = await User.findOne({
      where: {
        username: req.body.username
      }
    });
    //Check to see if friendship already exists
    try{
      const existingFriendship = await UserFriends.findOne({
        where: {
            user_id: someUser_id, friend_id: newFriend.id,        
        }
      })
      if(existingFriendship){
        console.log("Friendship already exists");
        res.status(200).json("I don't have that");
        return;
      }
    }
    catch(err){
      console.log("Existing friendship not found");
    }
    //Check to see that user exists
    if(!newFriend){
    res.status(404).json({ message: "No friend found" });
    }
    const newFriendship = await UserFriends.create({
        user_id: someUser_id,
        friend_id: newFriend.id,
        status: 1
    });
    
    req.session.save(() => {
      loggedIn = true;
      user_id = req.session.user_id;
    });
    alert("Friend request sent");
    res.status(200);
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
            res.redirect(200, '/');
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
        res.redirect(200, '/');
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