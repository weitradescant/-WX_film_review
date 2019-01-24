// pages/user/user.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
Page({
  data: {
    userInfo: null,
  },
  onLoad: function (options) {
    this.checkSession({
      success: ({ userInfo }) => {
        console.log('chenggong')
        this.setData({
          userInfo: userInfo
        })
      },
      error: () => { console.log('shibai') }
    })
  },
  //检验当前用户的session_key是否有效）
  checkSession({ success, error }) {
    wx.checkSession({
      success: () => {
        this.getUserInfo({ success, error })
      },
      fail: () => {
        error && error()
      }
    })
  },
  getUserInfo({ success, error }) {
    qcloud.request({
      url: config.service.requestUrl,
      login: true,
      success: result => {
          let data = result.data
          if (!data.code) {
            let userInfo = data.data
            console.log(userInfo)
            success && success({
              userInfo
            })
          } else {
            error && error()
          }
        },
        fail: () => {
          error && error()
        }
      })
  },
  onTapLogin: function (e) {
    var that = this;
    //此处授权得到userInfo
    if (e.detail.userInfo){
      console.log('授权了')
    } else {
      wx.showToast({
        title:'授权失败',
        icon:'none'
      })
    }
  },
  doQcloudLogin({ success, error }) {
    // 调用 qcloud 登陆接口
    qcloud.login({
      success: result => {
          if (result) {
            let userInfo = result
            success && success({
              userInfo
            })
          } else {
            // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
            this.getUserInfo({ success, error })
          }
        },
        fail: () => {
          error && error()
        }
      })
  },
  onTapHome() {//回到首页
    wx.navigateTo({
      url: '/pages/home/home',
    })
  }
})