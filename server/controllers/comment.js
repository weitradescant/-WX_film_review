const DB = require('../utils/db')

module.exports = {

  /**
   * 添加评论
   */
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let username = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl

    let movieId = +ctx.request.body.movie_id
    let content = ctx.request.body.content || null
    let isrecord
    if(ctx.request.body.type == "0"){
      isrecord = "0"
    } else if (ctx.request.body.type == "1") {
      isrecord = "1"
    }
    if (!isNaN(movieId)) {
      await DB.query('INSERT INTO comment(user, username, avatar, content, isrecord, movie_id) VALUES (?, ?, ?, ?, ?, ?)', [user, username, avatar, content, isrecord, movieId])
    }

    ctx.state.data = {}
  },

  /**
   * 获取评论列表
   */
  list: async ctx => {
    let id = + ctx.params.id
    let comment
    if (!isNaN(id)) {
      comment = (await DB.query('select * from comment where comment.movie_id = ?', [id]))
    } else {
      comment = {}
    }
    ctx.state.data = comment
  },
}