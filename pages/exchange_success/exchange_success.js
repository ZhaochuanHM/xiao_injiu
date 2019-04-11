// pages/exchange_success/exchange_success.js
const common = require('../../utils/common.js');
const app = getApp();
let goodsId = '';
let address = '';
let url = app.globalData.base_host;
let sessionId = wx.getStorageSync('sessionId');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    adress : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    goodsId = options.goodsId;
    let this_ = this;
    if(options.address){
      let checkAddress = JSON.parse(options.address);
      this_.setData({
        address: checkAddress
      })
    } else {
      let param = {
        sessionId: sessionId
      }
      common.common_ajax(url + '?c=Tracingsource&a=defaultAddress', param, true, function (data) {
        if (data.result == 'success') {
          let address = data.data[0];
          this_.setData({
            address: address
          })
        } else {

        }
      })
    }
  },
  /**
   *修改地址 
   */
  changeAddress(){
    wx.navigateTo({
      url: "/pages/address_list/address_list?type=changeAddress",
    })
  },
/**
   *提交收货
   */
  confirmation(){
    let that = this;
    let sessionId = wx.getStorageSync('sessionId');
    let address_id = that.data.address.address_id;
    console.log(address)
    let param = {
      goodsId: goodsId,
      addressId: address_id,
      sessionId: sessionId
    }
    //详情加载
    common.common_ajax(url + '?c=GoodsExchange&a=goodsExchange', param, true, function (data) {
      if (data.result == 'success') {
        wx.showToast({
          title: data.msg,
          icon: 'success',
          duration: 500
        })
        setTimeout(function(){
          var pages = getCurrentPages();
          var currPage = pages[pages.length - 1];   //当前页面
          var prevPage = pages[pages.length - 2];  //上一个页面
          //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
          wx.navigateBack({
            delta: pages.length
          });
        },500)
      } else {
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })

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