const connection = require('../app/db')

class LikeService {
  async chekcHasLiked(momentId, userId) {
    const statement = `SELECT * FROM moment_users WHERE moment_id = ? AND user_id = ?;`;
    const [hasLiked] = await connection.execute(statement, [momentId, userId])
    const result = hasLiked.length === 0 ? false : true;
    return result;
  }
}

module.exports = new LikeService()