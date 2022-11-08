const app = require('./app/index')
const config = require('./app/config')
require('./app/db')

app.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}端口启动成功~`)
});