const likeService = require('../service/likeService')

const verifyHasLiked = async (ctx, next) => {
  const { momentId } = ctx.params;
  const { id } = ctx.user;
  const result = await likeService.chekcHasLiked(momentId, id)
  if (result) {
    ctx.body = {
      statusCode: 400,
      message: "请勿重复点赞"
    }
  } else {
    await next()
  }
}

module.exports = { verifyHasLiked };