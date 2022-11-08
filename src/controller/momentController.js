const fs = require('fs')
const momentService = require('../service/momentService')
const { PICTURE_PATH } = require('../constants/filePath')

class MomentController {
  async createMoment(ctx, next) {
    const userId = ctx.user.id
    const content = ctx.request.body.content
    const result = await momentService.createMoment(userId, content)
    ctx.body = result;
  }

  async detail(ctx, next) {
    const momentId = ctx.params.momentId
    const result = await momentService.getMomentById(momentId)
    ctx.body = result
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query
    const result = await momentService.getMomentList(offset, size)
    ctx.body = result
  }

  async update(ctx, next) {
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await momentService.updateMoment(content, momentId);
    ctx.body = result
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params;
    await momentService.removeMoment(momentId)
    ctx.body = {
      statusCode: 200,
      message: '删除成功'
    }
  }

  async addTags(ctx, next) {
    const { momentId } = ctx.params;
    const { tags } = ctx;
    for (let tag of tags) {
      const isExist = await momentService.hasTag(momentId, tag.id)
      if (!isExist) {
        await momentService.addTag(momentId, tag.id)
      }
    }
    ctx.body = {
      statusCode: 200,
      message: '添加成功'
    };
  }

  async addLike(ctx, next) {
    const { momentId } = ctx.params;
    const { id } = ctx.user;
    await momentService.createLike(momentId, id);
    ctx.body = {
      statusCode: 200,
      message: '点赞成功'
    }
  }

  async removeLike(ctx, next) {
    const { momentId } = ctx.params;
    await momentService.removeLikes(momentId);
    ctx.body = {
      statusCode: 200,
      message: '取消成功'
    }
  }

  async pictureInfo(ctx, next) {
    let { filename } = ctx.params;
    const pictureInfo = await momentService.getPictureInfoByFilename(filename);
    const { type } = ctx.query;
    const types = ["small", "medium", "large"];
    if (types.some(item => item === type)) {
      filename = filename + '-' + type;
    }
    ctx.response.set('content-type', pictureInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
  }
}

module.exports = new MomentController()