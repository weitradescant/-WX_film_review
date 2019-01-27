const DB = require('../utils/db')

module.exports = {
  /**
   * 获取评论详情
   */
  comment: async ctx => {
    let movieId = ctx.request.body.movie_id
    let user = ctx.request.body.user
    let comment
    comment = (await DB.query("select * from commentwhere comment.movie_id = ? and comment.user = ?", [movieId, user]))
    ctx.state.data = comment
  },
}