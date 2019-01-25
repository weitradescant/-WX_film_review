// pages/home/home.js
const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config')
data: {
  movies: [];
}
Page({
  onLoad: function (options){
    wx.showLoading({
      title: '电影数据加载中...',
    })
    qcloud.request({
      url: config.service.movieList,
      success: result => {
        wx.hideLoading()
        if(!result.data.code){
          let ord = Math.floor(Math.random() * 15 + 1);
          let movies = result.data.data;
          for (const movie of movies) {
            if (ord === movie.id) {
              this.setData({
                movies: movie
              })
            }
          }
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
  },
  onTapCommentDtl(e) {
    let movieid = e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '/pages/commentDtl/commentDtl?movieid=' + movieid,
    })
  },
  onTapMoiveList(){
    wx.navigateTo({
      url: '/pages/movieList/movieList',
    })
  },
  onTapUser() {
    wx.navigateTo({
      url: '/pages/user/user',
    })
  },

})