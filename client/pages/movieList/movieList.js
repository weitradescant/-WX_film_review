// pages/movieList/movieList.js
const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config')
data: {
  movies: [];
}
Page({
  onLoad: function (options) {
    wx.showLoading({
      title: '电影列表加载中...',
    })
    qcloud.request({
      url: config.service.movieList,
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
  onTapMoiveDtl(e) {
    let movieid = e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '/pages/movieDtl/movieDtl?movieid=' + movieid,
    })
  }
})