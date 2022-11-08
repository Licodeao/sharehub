const errorTypes = require('../constants/errorTypes')

const errorHandler = (error, ctx) => {
  let status, message;

  switch(error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = "用户名或密码不能为空!";
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409;
      message = "当前用户名已存在!";
      break;
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400;
      message = "当前用户名不存在!";
      break;
    case errorTypes.PASSWORD_IS_INCORRECT:
      status = 400;
      message = "当前密码错误!";
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401;
      message = "当前用户未授权!";
      break;
    case errorTypes.UNPERMISSION:
      status = 401;
      message = "无权限进行此操作!";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
  }

  ctx.status = status;
  ctx.body = message
}

module.exports = errorHandler;