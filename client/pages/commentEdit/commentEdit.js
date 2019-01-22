// pages/commentEdit/commentEdit.js
Page({
  data: {
    type: ""
  },

  onLoad: function (options) {
    this.setData({
      type: options.type
    })
    console.log(this.data.type)
  },
  onTapCommentPreview() {
    wx.navigateTo({
      url: '/pages/commentPreview/commentPreview',
    })
  },
})