// pages/commentDtl/commentDtl.js
const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config')
const app = getApp()
Page({
  data: {
    userInfo: null,
    locationAuthType: app.data.locationAuthType,
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
  onTapAddComment() {
    wx.showActionSheet({
      itemList: ['文字', '音频'],
      success(res) {
        console.log('dianji')
        wx.navigateTo({
          url: '/pages/commentEdit/commentEdit?type=' + res.tapIndex,
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
      }
    })
  },
})