const connection = require('../app/db')

class MomentService {
  async createMoment(userId, content) {
    const statement = `INSERT INTO moment (content, user_id) VALUES(?, ?);`;
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }

  async getMomentById(momentId) {
    try {
      const statement = `
      SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, 
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
        IF(COUNT(t.id), JSON_ARRAYAGG(
          JSON_OBJECT('id', t.id, 'name', t.name)
        ), NULL) tags,
        (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
          JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id,
          'createTime', c.createAt, 'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl', cu.avatar_url))
        ), NULL) FROM comment c LEFT JOIN users cu ON c.user_id = cu.id WHERE m.id = c.comment_id) comments,
        IF(COUNT(u.id), JSON_ARRAYAGG(
          JSON_OBJECT('id', u.id, 'name', u.name)
        ), NULL) likes,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', p.filename)) FROM picture p WHERE p.moment_id = m.id) images
      FROM moment m
      LEFT JOIN moment_users mu ON m.id = mu.moment_id
      LEFT JOIN users u ON mu.user_id = u.id
      LEFT JOIN moment_tag ml ON m.id = ml.moment_id
      LEFT JOIN tag t ON ml.tag_id = t.id
      WHERE m.id = ?
      GROUP BY m.id;
    `;
      const [result] = await connection.execute(statement, [momentId]);
      return result[0]
    } catch (e) {
      console.log(e)
    }
  }

  async getMomentList(offset, size) {
    const statement = `
      SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, 
        JSON_OBJECT('id', u.id, 'name', u.name) author,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_tag mt WHERE mt.moment_id = m.id) tagCount,
        (SELECT COUNT(*) FROM picture p WHERE p.moment_id = m.id) picCount,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', p.filename)) FROM picture p WHERE p.moment_id = m.id) images
      FROM moment m 
      LEFT JOIN users u 
      ON m.user_id = u.id
      LIMIT ?, ?;
    `
    const [result] = await connection.execute(statement, [offset, size]);
    return result
  }

  async updateMoment(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [content, momentId])
    return result
  }

  async removeMoment(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [momentId])
    return result
  }

  async hasTag(momentId, tagId) {
    const statement = `SELECT * FROM moment_tag WHERE moment_id = ? AND tag_id = ?;`;
    const [result] = await connection.execute(statement, [momentId, tagId]);
    return result[0] ? true : false;
  }

  async addTag(momentId, tagId) {
    const statement = `INSERT INTO moment_tag (moment_id, tag_id) VALUES(?, ?);`;
    const [result] = await connection.execute(statement, [momentId, tagId])
    return result
  }

  async createLike(momentId, userId, status) {
    const statement = `INSERT INTO moment_users (moment_id, user_id) VALUES(?, ?);`;
    const [result] = await connection.execute(statement, [momentId, userId])
    return result
  }

  async removeLikes(momentId) {
    const statement = `DELETE FROM moment_users WHERE moment_id = ?;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result
  }

  async getPictureInfoByFilename(filename) {
    const statement = `SELECT * FROM picture WHERE filename = ?;`;
    const [result] = await connection.execute(statement, [filename]);
    return result[0]
  }
}

module.exports = new MomentService();