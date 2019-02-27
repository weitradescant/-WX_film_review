const DB = require('../utils/db')

module.exports = {
  /**
     * 获取收藏的评论列表
     */
  list: async ctx => {
    let user = ctx.params.id
    ctx.state.data = (await DB.query('select b.username,b.avatar,b.isrecord,b.content,c.image,c.title from collect a left join comment b on a.comment_id = b.id left join movies c on b.movie_id = c.id where a.user= ? ', [user]))
  },
  /**
   * 收藏评论
   */
  add: async ctx => {
    let user = ctx.request.body.user
    let comment_id = +ctx.request.body.comment_id
    let hasCollect = (await DB.query('select * from collect where user = ? and comment_id = ?', [user, comment_id])).length
    let msg
    if (hasCollect > 0){
      msg = '你已经收藏过了'
    } else {
      await DB.query('INSERT INTO collect(user, comment_id) VALUES (?, ?)', [user, comment_id])
      msg = '收藏成功'
    } 
    ctx.state.data = { msg: msg }
  },

  
}