const connection = require('../app/db')

class FileService {
  async save(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES(?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId])
    return result
  }

  async getAvatarInfoByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
    const [result] = await connection.execute(statement, [userId])
    return result[0]
  }

  async createPicture(filename, mimetype, size, momentId, userId) {
    const statement = `INSERT INTO picture (filename, mimetype, size, moment_id, user_id) VALUES(?, ?, ?, ?, ?)`;
    const [result] = await connection.execute(statement, [filename, mimetype, size, momentId, userId])
    return result
  }
}

module.exports = new FileService()