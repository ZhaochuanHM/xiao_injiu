// pages/rush_to_buy_people/rush_to_buy_people.js
const common = require('../../utils/common.js');
// app
const app = getApp();
var prizeId;
var waId;
// 默认地址
let address;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_img: '../../images/qianggou.png',
    address : {},
    showBack : false,
    dataList : {},
    userList : {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let this_ = this;
    prizeId = options.prizeId;
    waId = options.wa_id;
    console.log(waId);
    this.secKillDetail();
    this.joinUser();
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
   * 默认地址
   */
  defaultAddress : function(){
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      sessionId: sessionId
    }
    common.common_ajax(url + '?c=Tracingsource&a=defaultAddress', param, true, function (data) {
      if (data.result == 'success') {
        address = data.data[0];
        console.log(address)
        this_.setData({
          address: address
        })
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
   * 抢购详情
   */
  secKillDetail: function () {
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      prizeId: prizeId,
      sessionId: sessionId
    }
    // 列表加载
    common.common_ajax(url + '?c=WelfareActivity&a=waPrizeInfo', param, true, function (data) {
      if (data.result == 'success') {
        let nowdataList = data.data
        let winning_address = nowdataList.winning_address;
        let showBack = false;
        if(winning_address != []){
          showBack  = !showBack
        }
        this_.setData({
          dataList: nowdataList,
          address: winning_address,
          showBack: showBack
        })
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
   * 帮砍人
   */
  joinUser: function () {
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      prizeId: prizeId,
      sessionId: sessionId
    }
    // 列表加载
    common.common_ajax(url + '?c=WelfareActivity&a=joinUser', param, true, function (data) {
      if (data.result == 'success') {
        let newList = data.data
        this_.setData({
          userList: newList
        })
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
   * 地址填写
   */
  chooseAddress(){
    wx.navigateTo({
      url: '/pages/address_list/address_list?type=prize',
    })
  },
  /**
   * 地址提交
   */
  postAddress : function(){
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let addressId = this_.data.address.address_id
    let param = {
      prizeId: prizeId,
      sessionId: sessionId,
      addressId: addressId,
      waId: waId
    }
    common.common_ajax(url + '?c=WelfareActivity&a=perfectWaWinningAddress', param, true, function (data) {
      if (data.result == 'success') {
        wx.showToast({
          title: '地址填写成功',
          icon: 'success',
          duration: 1500
        })
        this_.setData({
          showBack : true
        })
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
   * 回首页
   * */ 
  backHome : function(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})