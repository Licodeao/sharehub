const jwt = require('jsonwebtoken')

const errorType = require('../constants/errorTypes')
const userService = require('../service/userService')
const authService = require('../service/authService')
const md5Password = require('../utils/handlePassword')
const { PUBLIC_KEY } = require('../app/config')

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }

  const result = await userService.getUserByName(name);
  const user = result[0]
  if (!user) {
    const error = new Error(errorType.USER_DOES_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  if (md5Password(password) !== user.password) {
    const error = new Error(errorType.PASSWORD_IS_INCORRECT);
    return ctx.app.emit('error', error, ctx);
  } 

  ctx.user = user;

  await next();
}

const verifyAuth = async(ctx, next) => {
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(errorType.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = result;
    await next()
  } catch(e) {
    const error = new Error(errorType.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
}

const verifyPermission = async (ctx, next) => {
  const [resourceKey] = Object.keys(ctx.params)
  const tableName = resourceKey.replace('Id', '')
  const resourceId = ctx.params[resourceKey]
  const { id } = ctx.user;
  try {
    const isPermission = await authService.checkResource(tableName, resourceId, id)
    if (!isPermission) throw new Error()
    await next()
  } catch(e) {
    const error = new Error(errorType.UNPERMISSION)
    return ctx.app.emit('error', error, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
};