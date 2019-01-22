// pages/commentDtl/commentDtl.js
Page({
  data: {

  },
  onLoad: function (options) {

  },
  onTapAddComment() {
    wx.showActionSheet({
      itemList: ['文字', '音频'],
      success(res) {
        console.log('dianji')
        wx.navigateTo({
          url: '/pages/commentEdit/commentEdit?type=' + res.tapIndex,
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }

})