const tagService = require('../service/tagService')

class TagController {
  async create(ctx, next) {
    const { name } = ctx.request.body;
    const result = await tagService.createTag(name)
    ctx.body = result
  }

  async list(ctx, next) {
    const { limit, offset } = ctx.query;
    const result = await tagService.getTags(limit, offset);
    ctx.body = result;
  }
}

module.exports = new TagController()