const fs = require('fs')
const userService = require('../service/userService')
const fileService = require('../service/fileService')
const { AVATAR_PATH } = require('../constants/filePath')


class UserController {
  async createUser(ctx, next) {
    const user = ctx.request.body;
    const result = await userService.create(user);
    ctx.body = result;
  }

  async avatarInfo(ctx, next) {
    const { userId } = ctx.params;
    const avatarInfo = await fileService.getAvatarInfoByUserId(userId);
    ctx.response.set('content-type', avatarInfo.mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }
}

module.exports = new UserController();