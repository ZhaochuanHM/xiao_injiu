// pages/login/login.js
const common = require('../../utils/common.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loginIcon: '../../images/logo.png',
        aboutText: '畅IN酒,乐更多',
        tipsText1: '您暂未授权 "in酒" 小程序获取您的授权信息，将无法正常使用小程序的功能。',
        tipsText2: '如需正常使用小程序，请点击 "授权" 按钮。',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      app.login();
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
     * 授权登录
    */
    onGotUserInfo : function (res) {
      const sessionId = wx.getStorageSync('sessionId');
      // console.log(res);
      wx.setStorageSync('userInfo', res.detail.userInfo);
      // console.log(res.detail.userInfo);
      var param2 = {
        encryptedData: res.detail.encryptedData,
        iv: res.detail.iv,
        sessionId: sessionId
      }
      common.common_ajax(app.globalData.base_host + '?c=User&a=register', param2, true, function (data) {
        if (data.result == 'success'){
          wx.setStorageSync('is_reg', 1);
          wx.reLaunch({
            url: '/pages/index/index'
          })
        }else{
          wx.showToast({
            title: data.msg,
          })
        }
      })
    }
})