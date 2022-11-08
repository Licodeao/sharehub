const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const useRoutes = require('../router');
const errorHandler = require('./error-handle');

app.use(bodyParser());

useRoutes(app);

app.on('error', errorHandler);

module.exports = app;