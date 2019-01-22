// pages/movieDtl/movieDtl.js
const qcloud = require('../../vendor/wafer2-client-sdk/index');
Page({
  data: {
    movieid: "",
    movies: []
  },
  onLoad(options) {
    this.setData({
      movieid: options.movieid
    })
    qcloud.request({
      url: 'https://xi3tufus.qcloud.la/weapp/movies',
      success: result => {
        let movies = result.data.data;
        for (const movie of movies) {
          if (this.data.movieid == movie.id) {
            this.setData({
              movies: movie
            })
          }
        }
      },
      fail: result => {
        console.log('error')
      }
    })
  },
  onTapCommentList() {
    wx.navigateTo({
      url: '/pages/commentList/commentList',
    })
  },
  onTapAddComment() {
    wx.showActionSheet({
      itemList: ['文字', '音频'],
      success(res) {
        wx.navigateTo({
          url: '/pages/commentEdit/commentEdit?type=' + res.tapIndex,
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }
})