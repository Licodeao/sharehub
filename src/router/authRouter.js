const Router = require('koa-router');

const authRouter = new Router();

const { login, success } = require('../controller/authController');
const { verifyLogin, verifyAuth } = require('../middleware/authMiddleWare')

authRouter.post('/login', verifyLogin, login);
authRouter.get('/test', verifyAuth, success)

module.exports = authRouter;