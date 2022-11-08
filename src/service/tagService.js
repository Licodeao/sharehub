const connection = require('../app/db')

class TagService {
  async createTag(name) {
    const statement = `INSERT INTO tag (name) VALUES (?);`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }

  async getTagByName(name) {
    const statement = `SELECT * FROM tag WHERE name = ?;`;
    const [result] = await connection.execute(statement, [name]);
    return result[0];
  }

  async getTags(limit, offset) {
    const statement = `SELECT * FROM tag LIMIT ?, ?;`;
    const [result] = await connection.execute(statement, [offset, limit]);
    return result;
  }
}

module.exports = new TagService()