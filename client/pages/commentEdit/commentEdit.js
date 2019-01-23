// pages/commentEdit/commentEdit.js
const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config')
Page({
  data: {
    type: "",
    movieid: "",
    movies: {},
    isRecord: false,
    tempFilePath: "",
    duration: 0
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '信息加载中...',
    })
    this.setData({
      type: options.type,//0为文字 1为音频
      movieid: options.movieid
    })
    qcloud.request({
      url: config.service.movieDetail + options.movieid,
      success: result => {
        wx.hideLoading()
        this.setData({
          movies: result.data.data[0]
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
  onTapCommentPreview() {
    wx.navigateTo({
      url: '/pages/commentPreview/commentPreview?movieid=' + this.data.movieid+'&type=' + this.data.type+'&duration=' + this.data.duration + '&tempFilePath=' + this.data.tempFilePath
    })
  },
  onTapStartRecord() {
    const recorderManager = wx.getRecorderManager()
    if (!this.data.isRecord){//没在录音
      const options = {
        duration: 10000,
        sampleRate: 44100,
        numberOfChannels: 1,
        encodeBitRate: 192000,
        format: 'aac',
        frameSize: 50
      }
      this.setData({
        isRecord: true
      })
      recorderManager.start(options)//开始录音
    } else{
      recorderManager.stop()//结束录音
    }
    recorderManager.onStop((res) => {//监听停止事件
      const { tempFilePath } = res//临时地址
      this.setData({
        isRecord: false,
        tempFilePath: res.tempFilePath,
        duration: res.duration
      })
    })
  }
})