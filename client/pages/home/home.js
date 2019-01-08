// pages/home/home.js
Page({
  onTapMoiveDtl() {
    wx.navigateTo({
      url: '/pages/movieDtl/movieDtl',
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
  }
})