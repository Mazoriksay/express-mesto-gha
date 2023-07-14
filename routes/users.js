const userRouter = require('express').Router();
const {
  getUsers,
  getUserId,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserId);
userRouter.post('/', createUser);
userRouter.patch('/me', updateUserInfo);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;
