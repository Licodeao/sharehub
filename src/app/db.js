const mysql = require('mysql2')
const config = require('./config')

const connections = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD
})

connections.getConnection(function(err, conn) {
  if (err) {
    console.log("getConnection出错，原因是", err)
  } else {
    conn.connect((err) => {
      if (err) {
        console.log("数据库连接失败，原因：", err)
      } else {
        console.log("数据库连接成功~")
      }
    })
  }
})

module.exports = connections.promise()