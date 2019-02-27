// pages/movieDtl/movieDtl.js
const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config')
const app = getApp()
Page({
  data: {
    userInfo: null,
    locationAuthType: app.data.locationAuthType,
    movieid: "",
    movies: {},
    hasComment: ""
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
            movies: result.data.data
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
  onTapCommentList() {
    wx.navigateTo({
      url: '/pages/commentList/commentList?movieid=' + this.data.movieid,
    })
  },
  onTapMyComment() {
    wx.navigateTo({
      url: '/pages/commentDtl/commentDtl?movieid=' + this.data.movieid + '&user=' + this.data.userInfo.openId,
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
        //查看用户是否评论过
        qcloud.request({
          url: config.service.commentDetail,
          data: {
            movie_id: this.data.movieid,
            user: this.data.userInfo.openId
          },
          success: result => {
            if (result.data.data.length == 0){
              this.setData({
                hasComment: 0
              })
            } else {
              this.setData({
                hasComment: 1
              })
            }
          },
          fail: result => {
            setTimeout(() => {
              wx.navigateBack()
            }, 2000)
          }
        })
      }
    })
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  }
})