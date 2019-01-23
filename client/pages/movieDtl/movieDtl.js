// pages/movieDtl/movieDtl.js
const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config')
Page({
  data: {
    movieid: "",
    movies: []
  },
  onLoad(options) {
    wx.showLoading({
      title: '电影数据加载中...',
    })
    this.setData({
      movieid: options.movieid
    })
    qcloud.request({
      url: config.service.movieDetail + options.movieid,
      success: result => {
        wx.hideLoading()
        if (!result.data.code) {
          this.setData({
            movies: result.data.data[0]
          })
        } else {
          setTimeout(() => {
            wx.navigateBack()
          }, 2000)
        }  
      },
      fail: result => {
        wx.hideLoading()
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }
    })
  },
  onTapCommentList() {
    wx.navigateTo({
      url: '/pages/commentList/commentList',
    })
  },
  onTapAddComment() {
    let movieid = this.data.movieid
    wx.showActionSheet({
      itemList: ['文字', '音频'],
      success(res) {
        wx.navigateTo({
          url: '/pages/commentEdit/commentEdit?type=' + res.tapIndex + '&movieid=' + movieid,
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }
})