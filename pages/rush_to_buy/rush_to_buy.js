// pages/rush_to_buy/rush_to_buy.js
const common = require('../../utils/common.js');
// app
const app = getApp();
var prizeId;
let url = app.globalData.base_host;
let sessionId = wx.getStorageSync('sessionId');
let location = wx.getStorageSync('address');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList : {}
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
   * 抢购详情
   */
  secKillDetail: function () {
    let this_ = this;
    let param = {
      prizeId: prizeId,
      sessionId: sessionId
    }
    // 列表加载
    common.common_ajax(url + '?c=WelfareActivity&a=waPrizeInfo', param, true, function (data) {
      if (data.result == 'success') {
        let nowdataList = data.data
        wx.setNavigationBarTitle({
          title: nowdataList.prize_name
        })
        this_.setData({
          dataList: nowdataList
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
   * 砍价
   */
  secKill : function(){
    wx.showLoading({
      title: '砍价中...',
      mask : true
    })
    let this_ = this;
    let param = {
      prizeId: prizeId,
      sessionId: sessionId
    }
    common.common_ajax(url + '?c=WelfareActivity&a=bargain', param, true, function (data){
      if (data.result == 'success') {
        wx.hideLoading();
        wx.showToast({
          title: data.msg,
          icon: 'success',
          duration: 1500
        })
        setTimeout(function(){
          this_.secKillDetail();
        },500);
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
   * 抢购
   */
  secBuy:function(){
    let this_ = this;
    let wa_id = this_.data.dataList.wa_id
    let param = {
      prizeId: prizeId,
      sessionId: sessionId
    }
    wx.showModal({
      title: '提示',
      content: '确认消耗' + this_.data.dataList.now_price + '酒币兑换该商品',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '抢购中...',
            mask: true
          })
          common.common_ajax(url + '?c=WelfareActivity&a=panicBuying', param, true, function (data) {
            if (data.result == 'success') {
              wx.hideLoading();
              wx.showToast({
                title: '抢购成功',
                icon: 'success',
                duration: 1500
              })
              setTimeout(function(){
                wx:wx.navigateTo({
                  url: '/pages/rush_to_buy_people/rush_to_buy_people?prizeId=' + prizeId + '&wa_id=' + wa_id,
                })
              },1500)
            } else {
              wx.showToast({
                title: data.msg,
                icon: 'none',
                duration: 2000
              })
              setTimeout(function () {
                this_.secKillDetail();
              },2000)
            }
          })
        } else if (res.cancel) {
          return false
        }
      }
    })
  }
})