const Router = require('koa-router');
const { createUser } = require('../controller/userController')
const { verifyUser, handlePassword } = require('../middleware/userMiddleWare')
const { avatarInfo } = require('../controller/userController')
const userRouter = new Router({ prefix: '/users' })

// 创建用户
userRouter.post('/', verifyUser, handlePassword,createUser);
userRouter.get('/:userId/avatar', avatarInfo)

module.exports = userRouter