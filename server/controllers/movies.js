const DB = require('../utils/db.js')

module.exports = {
  list: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM movies;")
  },
  detail: async ctx => {
    let id = + ctx.params.id
    let movie
    if (!isNaN(id)) {
      movie = (await DB.query('select * from movies where movies.id = ?', [id]))[0]
    } else {
      movie = {}
    }
    ctx.state.data = movie
  }
}