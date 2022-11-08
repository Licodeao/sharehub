const errorType = require('../constants/errorTypes')
const service = require('../service/userService')
const md5Password = require('../utils/handlePassword')

const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  const result = await service.getUserByName(name);
  if (result.length) {
    const error = new Error(errorType.USER_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  await next();
}

const handlePassword = async (ctx, next) => {
  let { password } = ctx.request.body;
  password = md5Password(password);
  ctx.request.body.password = password;
  await next();
}

module.exports = {
  verifyUser,
  handlePassword
}