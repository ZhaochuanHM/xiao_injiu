// pages/my/my.js
const common = require('../../utils/common.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : {},
    my_lottery : '',
    my_bargaining : '',
    my_seckill : '', 
    is_agency: 0

  },
  // pageTo(e){
  //   var url = e.currentTarget.dataset.url;
  //   wx.navigateTo({
  //     url: url,
  //   }) 
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  // 跳转
  pageTo(e){
    common.pageTo(e);
  },
  // 收货地址
  address(){
    wx.navigateTo({
      url: '/pages/address_list/address_list',
    })
  },
  onLoad: function (options) {
    var that = this;
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo: userInfo
    })

    //请求数据
    that.init();
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
  init:function(){
    let that = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      sessionId: sessionId,
    }


    // 列表加载
    common.common_ajax(url + '?c=PersonalCenter&a=personal', param, true, function (data) {
      if (data.result == 'success') {

        that.setData({
          my_lottery: data.data.my_self_prize[0].numb_,
          my_bargaining: data.data.my_self_prize[2].numb_,
          my_seckill: data.data.my_self_prize[1].numb_,
          is_agency: data.data.is_agency
        })

      } else {
        loadMoreView.loadMoreFail();
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  login_out:function(){
    wx.clearStorageSync();
    wx.redirectTo({
      url: '/pages/login/login'
    })
  }
})