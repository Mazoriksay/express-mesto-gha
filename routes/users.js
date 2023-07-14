const userRouter = require('express').Router();
const { getUsers, getUserId, createUser } = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/users/:userId', getUserId);
userRouter.post('/', createUser);

module.exports = userRouter;
