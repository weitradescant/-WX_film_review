// pages/commentPreview/commentPreview.js
const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config')
Page({
  data: {
    type: "",
    movieid: "",
    movies: {},
    tempFilePath: "",
    duration: 0
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '评论预览加载中...',
    })
    this.setData({
      type: options.type,//0为文字 1为音频
      movieid: options.movieid,
      tempFilePath: options.tempFilePath,
      duration: options.tempFilePath
    })
    qcloud.request({
      url: config.service.movieDetail + options.movieid,
      success: result => {
        wx.hideLoading()
        this.setData({
          movies: result.data.data[0]
        })
        console.log(this.data)
      },
      fail: result => {
        wx.hideLoading()
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }
    })
  },
  onTapCommentEdit() {
    wx.navigateTo({//返回判断返回那种类型的编辑
      url: '/pages/commentEdit/commentEdit?type=' + this.data.type + '&movieid=' + this.data.movieid
    })
  },
  onTapCommentList() {
    wx.navigateTo({
      url: '/pages/commentList/commentList',
    })
  },
})