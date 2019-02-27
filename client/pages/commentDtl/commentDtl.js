// pages/commentDtl/commentDtl.js
const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config')
const app = getApp()
const innerAudioContext = wx.createInnerAudioContext()
Page({
  data: {
    userInfo: null,
    movieid: "",
    movies: {},
    locationAuthType: app.data.locationAuthType,
    user: "",
    comment:{},
    hasComment: ""
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
        this.setData({
          comment: result.data.data[0]
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

  onTapLogin: function () {
    app.login({
      success: ({ userInfo }) => {
        this.setData({
          userInfo,
          locationAuthType: app.data.locationAuthType
        })
        this.hasComment()
      },
      error: () => {
        this.setData({
          locationAuthType: app.data.locationAuthType
        })
      }
    })
  },
  onTapStartRecord() {
    innerAudioContext.src = this.data.comment.content;
    innerAudioContext.play();
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
      }
    })
  },
  onTapCollect() {
      qcloud.request({
        url: config.service.collect,
        login: true,
        method: 'PUT',
        data: {
          user:this.data.userInfo.openId,
          comment_id:this.data.comment.id
        },
        success: result => {
          wx.hideLoading()
          let data = result.data
          if (!data.code) {
            wx.showToast({
              icon: 'none',
              title: data.data.msg
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '收藏评论失败'
            })
          }
        },
        fail: () => {
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: '收藏评论失败'
          })
        }
      })


    console.log(this.data)
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
        this.hasComment()
      }
    })
  },
  //查看用户是否评论过
  hasComment() {
    qcloud.request({
      url: config.service.commentDetail,
      data: {
        movie_id: this.data.movieid,
        user: this.data.userInfo.openId
      },
      success: result => {
        if (result.data.data.length == 0) {
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
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  }
})