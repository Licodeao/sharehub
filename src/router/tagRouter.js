const Router = require('koa-router')
const { create, list } = require('../controller/tagController')
const { verifyAuth } = require('../middleware/authMiddleWare')

const tagRouter = new Router({ prefix: '/tag' })

tagRouter.post('/', verifyAuth, create)
tagRouter.get('/', list)

module.exports = tagRouter;