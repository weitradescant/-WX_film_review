// pages/commentList/commentList.js
Page({
  data: {
    movieid: "",
  },
  onLoad: function (options) {
    this.setData({
      movieid: options.movieid
    })
  },
  onTapCommentDtl() {
    wx.navigateTo({
      url: '/pages/commentDtl/commentDtl?movieid=' + this.data.movieid,
    })
  },
  onTapHome() {
    wx.navigateTo({
      url: '/pages/home/home',
    })
  }
})