const connection = require('../app/db')

class CommentService {
  async createComment(momentId, content, userId) {
    const statement = `
      INSERT INTO comment (content, moment_id, user_id) VALUES(?, ?, ?);
    `;
    try {
      const [result] = await connection.execute(statement, [content, momentId, userId]);
      return result;
    } catch(err) {
      console.log(err)
    }
  }

  async replyComment(momentId, content, userId, commentId) {
    const statement = `
      INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES(?, ?, ?, ?);
    `;
    try {
      const [result] = await connection.execute(statement, [content, momentId, userId, commentId]);
      return result;
    } catch(err) {
      console.log(err)
    }
  }

  async updateComment(content, commentId) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [content, commentId]);
    return result;
  }

  async removeComment(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [commentId]);
    return result;
  }

  async getCommentsByMomentId(momentId) {
    const statement = `
      SELECT c.id, c.content, c.comment_id commentId, c.createAt createTime,
      JSON_OBJECT('id', u.id, 'name', u.name) user
      FROM comment c
      LEFT JOIN users u ON u.id = c.user_id
      WHERE moment_id = ?;
    `;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new CommentService();