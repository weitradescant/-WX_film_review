// pages/home/home.js
const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config')

Page({
  data: {
    movies: {},
    comment: ""
  },
  onLoad: function (options){
    wx.showLoading({
      title: '电影数据加载中...',
    })
    qcloud.request({
      url: config.service.movieList,
      success: result => {
        wx.hideLoading()
        if(!result.data.code){
          let ord = Math.floor(Math.random() * 15 + 1);
          let movies = result.data.data;
          for (const movie of movies) {
            if (ord === movie.id) {
              this.setData({
                movies: movie
              })
            }
          }
        } else {
          setTimeout(() => {
            wx.navigateBack()
          }, 2000)
        }
        //得到电影 开始获取评论列表
        qcloud.request({
          url: config.service.commentList + this.data.movies.id,
          success: result => {
            wx.hideLoading()
            let data = result.data.data
            let commentLen = result.data.data.length
            if (!commentLen){
              return false
            }
            let comord = Math.floor(Math.random() * commentLen);
            this.setData({
              comment: data[comord]
            })
          },
          fail: result => {
            wx.hideLoading()
            setTimeout(() => {
              wx.navigateBack()
            }, 2000)
          }
        })
      },
      fail: result => {
        wx.hideLoading()
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }
    })
  },
  onTapMoiveDtl() {
    wx.navigateTo({
      url: '/pages/movieDtl/movieDtl?movieid=' + this.data.movies.id,
    })
  },
  onTapCommentDtl(e) {
    let movieid = e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '/pages/commentDtl/commentDtl?movieid=' + this.data.movies.id + '&user=' + this.data.comment.user,
    })
  },
  onTapMoiveList(){
    wx.navigateTo({
      url: '/pages/movieList/movieList',
    })
  },
  onTapUser() {
    wx.navigateTo({
      url: '/pages/user/user',
    })
  },
})