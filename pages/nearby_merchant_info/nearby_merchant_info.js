// pages/nearby_merchant_info.js
const common = require('../../utils/common.js');
// app
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchant_info_img: 'https://jsq-show.oss-cn-shenzhen.aliyuncs.com/in-wine/default-prize3.png',
    liveness_img: '../../images/activity.png',
    gps_img: '../../images/gps.png',
    mid: '',
    merchantInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ 
      mid: options.mid,
      distance: options.distance
    });
    this.merchantInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 导航
   */
  navigation: function (e) {
    var data = e.currentTarget.dataset;
    wx.openLocation({//​使用微信内置地图查看位置。
      latitude: parseFloat(data.lat),  //要去的纬度-地址
      longitude: parseFloat(data.lng), //要去的经度-地址
      name: data.name,
      address: data.address
    })
  },

  /**
   * 商户详情
   */
  merchantInfo: function(){
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      sessionId: sessionId,
      merchant_id: this_.data.mid
    }

    // 列表加载
    common.common_ajax(url + '?c=Merchant&a=merchantActivity', param, true, function (data) {
      if (data.result == 'success') {
        // 重新渲染数据
        this_.setData({
          merchantInfo: data.data[0]
        })

      } else {
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})