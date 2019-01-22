// pages/commentPreview/commentPreview.js
Page({
  data: {

  },

  onLoad: function (options) {

  },
  onTapCommentEdit() {
    wx.navigateTo({//返回判断返回那种类型的编辑
      url: '/pages/commentEdit/commentEdit',
    })
  },
  onTapCommentList() {
    wx.navigateTo({
      url: '/pages/commentList/commentList',
    })
  },
})