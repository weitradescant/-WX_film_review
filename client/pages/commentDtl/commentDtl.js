// pages/commentDtl/commentDtl.js
const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config')
const app = getApp()
Page({
  data: {
    userInfo: null,
    movieid: "",
    movies: {},
    locationAuthType: app.data.locationAuthType,
    user: ""
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '评论加载中...',
    })
    this.setData({
      movieid: options.movieid,
      user: options.user
    })
    //获取电影信息
    qcloud.request({
      url: config.service.movieDetail + options.movieid,
      success: result => {
        wx.hideLoading()
        this.setData({
          movies: result.data.data
        })
      },
      fail: result => {
        wx.hideLoading()
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }
    })
    //获取评论
    qcloud.request({
      url: config.service.commentDetail,
      data: {
        movie_id: this.data.movieid,
        user: this.data.user
      },
      success: result => {
        console.log(this.data.movieid, this.data.user,result)
      },
      fail: result => {
        wx.hideLoading()
        setTimeout(() => {
          console.log(this.data.movieid, this.data.user)
          wx.navigateBack()
        }, 2000)
      }
    })
  },

  onTapLogin: function () {
    app.login({
      success: ({ userInfo }) => {
        this.setData({
          userInfo,
          locationAuthType: app.data.locationAuthType
        })
      },
      error: () => {
        this.setData({
          locationAuthType: app.data.locationAuthType
        })
      }
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
      }
    })
  },
  onShow: function () {
    // 同步授权状态
    this.setData({
      locationAuthType: app.data.locationAuthType
    })
    app.checkSession({
      success: ({ userInfo }) => {
        this.setData({
          userInfo
        })
      }
    })
  },
})