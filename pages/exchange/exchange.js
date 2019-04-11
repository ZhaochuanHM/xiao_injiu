// pages/exchange/exchange.js
const common = require('../../utils/common.js');
const address = wx.getStorageSync('address');
const app = getApp();

function getGoodsInfo(that){
  let url = app.globalData.base_host;
  let address = wx.getStorageSync('address');
  let sessionId = wx.getStorageSync('sessionId');
  let page = 1;
  let param = {
    province: address.province,
    city: address.city,
    district: address.district,
    sessionId: sessionId,
    page: page
  }
  // 活动加载
  common.common_ajax(url + '?c=GoodsExchange&a=goodsList', param, true, function (data) {
    if (data.msg == '操作成功') {
      var data = data.data;
      that.setData({
        info : data
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
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info : [],
  },
  /**
   * 跳转
  */
  pageTo(e){
    let id = e.currentTarget.dataset.id;
    let coin = e.currentTarget.dataset.coin;
    wx.navigateTo({
      url: '/pages/exchange_detail/exchange_detail?id='+id+"&coin="+ coin,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getGoodsInfo(this);
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

  }
})