const fileService = require('../service/fileService')
const userService = require('../service/userService')
const { AVATAR_PATH } = require('../constants/filePath')
const { APP_HOST, APP_PORT } = require('../app/config')

class FileController {
  async saveAvatarInfo(ctx, next) {
    const { filename, mimetype, size } = ctx.req.file
    const { id } = ctx.user
    await fileService.save(filename, mimetype, size, id)
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
    await userService.updateAvatarUrl(id, avatarUrl);
    ctx.body = {
      statusCode: 200,
      message: "上传头像成功"
    }
  }

  async savePictureInfo(ctx, next) {
    const files = ctx.req.files;
    const { id } = ctx.user;
    const { momentId } = ctx.query;
    for(let file of files) {
      const { filename, mimetype, size } = file
      await fileService.createPicture(filename, mimetype, size, momentId, id);
    }
    ctx.body = {
      statusCode: 200,
      message: "图片上传成功"
    }
  }
}

module.exports = new FileController()