// pages/commentList/commentList.js
const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config')
Page({
  data: {
    movieid: "",
    comment: []
  },
  onLoad: function (options) {
    this.setData({
      movieid: options.movieid
    })
    wx.showLoading({
      title: '电影评论加载中...',
    })
    qcloud.request({
      url: config.service.commentList + this.data.movieid,
      success: result => {
        wx.hideLoading()
        let data = result.data.data
        let commentLen = result.data.data.length
        if (!commentLen) {
          wx.showToast({
            icon: 'none',
            title: '该影片暂无评论',
            mask: true
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1000)
          return false
        }
        this.setData({
          comment: data
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
  onTapCommentDtl(e) {
    let user = e.currentTarget.dataset.user;
    wx.navigateTo({
      url: '/pages/commentDtl/commentDtl?movieid=' + this.data.movieid + '&user=' + user,
    })
  },
  onTapHome() {
    wx.navigateTo({
      url: '/pages/home/home',
    })
  }
})