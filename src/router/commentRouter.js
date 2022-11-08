const Router = require('koa-router')
const { verifyAuth, verifyPermission } = require('../middleware/authMiddleWare')
const { create, reply, update, remove, list } = require('../controller/commentController')
const commentRouter = new Router({ prefix: '/comment' })

commentRouter.post('/', verifyAuth, create)
commentRouter.post('/:commentId/reply', verifyAuth, reply)
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update)
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, remove)
commentRouter.get('/', list)


module.exports = commentRouter