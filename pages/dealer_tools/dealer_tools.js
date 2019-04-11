// pages/dealer_tools/dealer_tools.js
const common = require('../../utils/common.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    merchant_name:'',
    integral:'',
    freeze_coin:'',
    wa_num_handing:'',
    wa_num_not_start:'',
  },

  // 跳转
  pageTo(e) {
    common.pageTo(e);
  },
  createActvities(){
    wx.showActionSheet({
      itemList: ['抽奖', '砍价', '秒杀'],
      success(res) {
        let index = res.tapIndex;
        switch(index){
          case 0 : 
            wx.navigateTo({
              url: '/pages/dealers_create_lottery/dealers_create_lottery',
            });
            break;
          case 1 :
            wx.navigateTo({
              url: '/pages/dealers_create_bargaining/dealers_create_bargaining',
            });
            break; 
          case 2:
            wx.navigateTo({
              url: '/pages/dealers_create_seckill/dealers_create_seckill',
            });
            break; 
          default :
            break;
        }
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // //获取位置
    // var address = wx.getStorageSync('address');
    // this.setData({
    //   address: address.district
    // })
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
    common.common_ajax(url + '?c=Agency&a=agencyData', param, true, function (data) {
      if (data.result == 'success') {
        console.log(data.data)
        that.setData({
          address: data.data.agency_area,
          merchant_name: data.data.agency_name,
          integral: data.data.integral,
          freeze_coin: '冻结酒币'+data.data.freeze_coin,
          wa_num_handing: data.data.wa_num_handing,
          wa_num_not_start: data.data.wa_num_not_start,
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
  integral_info:function(){
    wx.navigateTo({
      url: '/pages/integral_record/integral_record',
    });
  }
})