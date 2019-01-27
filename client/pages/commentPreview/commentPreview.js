// pages/commentPreview/commentPreview.js
const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config')
Page({
  data: {
    type: "",
    movieid: "",
    movies: {},
    commentValue:""
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '评论预览加载中...',
    })
    this.setData({
      type: options.type,//0为文字 1为音频
      movieid: options.movieid,
      commentValue: options.commentValue
    })
    qcloud.request({
      url: config.service.movieDetail + options.movieid,
      success: result => {
        wx.hideLoading()
        this.setData({
          movies: result.data.data
        })
      },
      fail: result => {
        wx.hideLoading()
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }
    })
  },
  onTapCommentEdit() {//重新编辑
    wx.navigateTo({//返回判断返回那种类型的编辑
      url: '/pages/commentEdit/commentEdit?type=' + this.data.type + '&movieid=' + this.data.movieid
    })
  },
  onTapCommentList() {//发布影评
    let content = this.data.commentValue
    if (!content) return
    qcloud.request({
      url: config.service.addComment,
      login: true,
      method: 'PUT',
      data: {
        content: content,
        movie_id: this.data.movieid,
        type: this.data.type
      },
      success: result => {
        wx.hideLoading()
        let data = result.data
        if (!data.code) {
          wx.showToast({
            title: '发表评论成功'
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/commentList/commentList?movieid=' + this.data.movieid,
            })
          }, 1500)
        } else {
          wx.showToast({
            icon: 'none',
            title: '发表评论失败'
          })
        }
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '发表评论失败'
        })
      }
    })
  },
})