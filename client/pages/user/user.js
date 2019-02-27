// pages/user/user.js
const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config')
const app = getApp()
Page({
  data: {
    userInfo: null,
    locationAuthType: app.data.locationAuthType,    
    tabs: ['评论的影评', '收藏的影评'],// 导航菜单栏
    curIdx: 0,// 当前导航索引
    comments: [],// 内容区列表
  },
  onLoad: function (options) {
    wx.stopPullDownRefresh()
  },
  
  onTapLogin: function () {
    app.login({
      success: ({ userInfo }) => {
        this.setData({
          userInfo,
          locationAuthType: app.data.locationAuthType
        })
        this.commented()
      },
      error: () => {
        this.setData({
          locationAuthType: app.data.locationAuthType
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
        this.commented()
      }
    })    
  },
  //切换导航
  clickTab: function (e) {
    var curIdx = e.currentTarget.dataset.current
    this.setData({
      curIdx: curIdx
    })
    if (curIdx == 0){//评论的影评
      this.commented()
    } else if (curIdx == 1){//收藏的影评
      wx.showLoading({
        title: '加载中...',
      })
      qcloud.request({
        url: config.service.collectList + this.data.userInfo.openId,
        success: result => {
          wx.hideLoading()
          if (!result.data.code) {
            this.setData({
              comments: result.data.data
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
    }
  }, 
  //请求评论的影评
  commented() {
    wx.showLoading({
      title: '加载中...',
    })
    qcloud.request({
      url: config.service.commented + this.data.userInfo.openId,
      success: result => {
        wx.hideLoading()
        if (!result.data.code) {
          this.setData({
            comments: result.data.data
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
  onTapCommentDtl(e) {
    let user = e.currentTarget.dataset.user;
    let movieid = e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '/pages/commentDtl/commentDtl?movieid=' + movieid + '&user=' + user,
    })
  },
  onTapHome() {//回到首页
    wx.navigateTo({
      url: '/pages/home/home',
    })
  },
  onPullDownRefresh() {
    this.onLoad()
  }
})