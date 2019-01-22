// pages/home/home.js
const qcloud = require('../../vendor/wafer2-client-sdk/index');

data: {
  movies: [];
}
Page({
  onLoad: function (options){
    qcloud.request({
      url:'https://xi3tufus.qcloud.la/weapp/movies',
      success: result => {
        let ord = Math.floor(Math.random() * 15 + 1);
        let movies = result.data.data;
        for (const movie of movies){
          if(ord === movie.id){
            this.setData({
              movies: movie
            })
          }
        }
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
  },
  onTapCommentDtl() {
    wx.navigateTo({
      url: '/pages/commentDtl/commentDtl',
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