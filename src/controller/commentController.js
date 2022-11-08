const commentService = require('../service/commentService')

class CommentController {
  async create(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { id } = ctx.user;
    const result = await commentService.createComment(momentId, content, id);
    ctx.body = result;
  }

  async reply(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { commentId } = ctx.params;
    const { id } = ctx.user;
    const result = await commentService.replyComment(momentId, content, id, commentId);
    ctx.body = result;
  }

  async update(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await commentService.updateComment(content, commentId);
    ctx.body = result;
  }

  async remove(ctx, next) {
    const { commentId } = ctx.params;
    const result = await commentService.removeComment(commentId);
    ctx.body = result;
  }

  async list(ctx, next) {
    const { momentId } = ctx.query;
    const result = await commentService.getCommentsByMomentId(momentId);
    ctx.body = result;
  }
}

module.exports = new CommentController()