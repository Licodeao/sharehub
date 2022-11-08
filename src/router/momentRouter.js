// 发表动态
const Router = require('koa-router')

const momentRouter = new Router({ prefix: '/moment' })

const { createMoment, detail, list, update, remove, addTags, addLike, removeLike, pictureInfo } = require('../controller/momentController')

const { verifyAuth, verifyPermission } = require('../middleware/authMiddleWare')

const { verifyTagExists } = require('../middleware/tagMiddleWare')

const { verifyHasLiked } = require('../middleware/likeMiddleWare')

momentRouter.post('/', verifyAuth, createMoment)
momentRouter.get('/', list)
momentRouter.get('/:momentId', detail)
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)
momentRouter.post('/:momentId/tags', verifyAuth, verifyPermission, verifyTagExists, addTags)
momentRouter.post('/:momentId/like', verifyAuth, verifyHasLiked, addLike)
momentRouter.delete('/:momentId/del', verifyAuth, removeLike)
momentRouter.get('/images/:filename', pictureInfo)


module.exports = momentRouter