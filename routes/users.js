const userRouter = require('express').Router();
const {
  getUsers,
  getUser,
  getUserId,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getUser);
userRouter.get('/:userId', getUserId);
userRouter.patch('/me', updateUserInfo);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;
