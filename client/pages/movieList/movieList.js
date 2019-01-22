// pages/movieList/movieList.js
const qcloud = require('../../vendor/wafer2-client-sdk/index');
data: {
  movies: [];
}
Page({
  onLoad: function (options) {
    qcloud.request({
      url: 'https://xi3tufus.qcloud.la/weapp/movies',
      success: result => {
        this.setData({
          movies: result.data.data
        })      
      },
      fail: result => {
        console.log('error')
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