const DB = require('../utils/db')

module.exports = {
  /**
   * 获取评论详情
   */
  comment: async ctx => {
    let movieId = +ctx.request.query.movie_id
    let user = ctx.request.query.user
    let comment
    comment = (await DB.query("select * from comment where comment.movie_id = ? and comment.user = ?", [movieId, user]))
    ctx.state.data = comment
  },

  /*获取某人所有评论*/
  list: async ctx => {
    let user = ctx.params.id
    ctx.state.data = (await DB.query('select a.*,b.title,b.image from comment a left join movies b on a.movie_id = b.id where a.user = ?', [user]))
  }
}