// pages/sec_kill/sec_kill.js
const common = require('../../utils/common.js');
// app
const app = getApp();
var prizeId;
var time;
let waId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    secKillList : {},
    is_start : false,
    time : '00:00:00',
    interval : '',
    // 地址选择
    address : {},
    showAddress : false ,
    // 抢购是否成功
    secSuccess : false,
    // 是否中奖
    isWinning : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    prizeId = options.prizeId;
    this.secKillDetail();
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
   * 秒杀详情
   */
  secKillDetail : function () {
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let param ={
      prizeId: prizeId,
      sessionId: sessionId
    }
    // 列表加载
    common.common_ajax(url + '?c=WelfareActivity&a=waPrizeInfo', param, true, function (data) {
      if (data.result == 'success') {
        let newList = data.data;
        // title 设置
        wx.setNavigationBarTitle({
          title: newList.prize_name
        })
        // 地址信息
        let address = newList.winning_address;
        let showAddress = false;
        if(address){
          showAddress = true
        }
        // 是否中奖
        let is_winning = newList.is_winning;
        // waId
        waId = newList.wa_id
        // 开始时间
        time = newList.range_sec_time;
        this_.setData({
          secKillList: newList,
          isWinning: is_winning,
          address : address,
          showAddress: showAddress
        })
        if(time == 0){
          this_.setData({
            is_start : true
          })
        }else{
          // 倒计时开始
          this_.setInterval();
        }
      } else {
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 定时器
  setInterval : function(){
    let this_ = this;
    this_.data.interval = setInterval(function(){
      time--;
      let int_day, int_hour, int_minute, int_second,timer
      let SysSecond = time;
      int_day = Math.floor(SysSecond / 86400);
      SysSecond -= int_day * 86400;
      int_hour = Math.floor(SysSecond / 3600);
      SysSecond -= int_hour * 3600;
      int_minute = Math.floor(SysSecond / 60);
      SysSecond -= int_minute * 60;
      int_second = SysSecond;

      if (int_hour < 10) {
        int_hour = "0" + int_hour;
      }

      if (int_minute < 10) {
        int_minute = "0" + int_minute;
      }

      if (int_second < 10) {
        int_second = "0" + int_second;
      }
      if(int_day>0){
        timer = int_day + '天'
      }else{
        timer = int_hour + ':' + int_minute + ':' + int_second;
      }
      this_.setData({
        time: timer
      })
      if(time<=0){
        this_.clearInterval();
        this_.setData({
          is_start : true
        })
      }
    },1000) 
  },
  // 清楚定时器
  clearInterval : function(){
    let interval = this.data.interval;
    clearInterval(interval);
  },
  /**
   * 立即秒杀
   * */
  secKill: function () {
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      prizeId: prizeId,
      sessionId: sessionId
    }
    wx.showModal({
      title: '提示',
      content: '确定消耗' + this_.data.secKillList.now_price + '酒币秒杀该商品',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '秒杀中...',
          })
          // 列表加载
          common.common_ajax(url + '?c=WelfareActivity&a=secKill', param, true, function (data) {
            if (data.result == 'success') {
              wx.hideLoading();
              this_.setData({
                secSuccess: true
              })
            } else {
              wx.hideLoading();
              wx.showToast({
                title: data.msg,
                icon: 'none',
                duration: 2000
              })
            }
          })
        } else if (res.cancel) {
         return false
        }
      }
    })
  } ,
  /**
   * 地址选择
   * */ 
  addressChoose : function(){
    wx.navigateTo({
      url: '/pages/address_list/address_list?type=secKill',
    })
  },
  /**
   * 地址提交
   */
  postAddress: function () {
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
          icon : 'success',
          duration : 1500
        })
        this_.setData({
          showAddress: true
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
  backHome: function () {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})