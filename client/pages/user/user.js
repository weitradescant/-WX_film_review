// pages/user/user.js
const app = getApp()
Page({
  data: {
    userInfo: null,
    locationAuthType: app.data.locationAuthType
  },
  onLoad: function (options) {
    
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
  onTapHome() {//回到首页
    wx.navigateTo({
      url: '/pages/home/home',
    })
  }
})