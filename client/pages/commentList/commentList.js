// pages/commentList/commentList.js
Page({
  onTapCommentDtl() {
    wx.navigateTo({
      url: '/pages/commentDtl/commentDtl',
    })
  },
  onTapHome() {
    wx.navigateTo({
      url: '/pages/home/home',
    })
  }
})