// pages/my_set/my_set.js
const token = require('../../utils/token.js');
const common = require('../../utils/common.js');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    logo:'',
    name:'',
    sex:'',
    tel:'',
    url:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //获取sessionId
    const sessionId = wx.getStorageSync('sessionId');

    var param1 = {
      sessionId: sessionId
    };

    common.common_ajax(app.globalData.base_host + '?c=Tracingsource&a=getUserInfo', param1, true, function (data) {

      if (data.result == 'success') {

        var sex = data.data.sex;

        var tel = data.data.mobile;

        that.setData({
          logo: data.data.headimg,
          name: data.data.nickname,
          sex: sex = 1 ? '男' : '女',
          tel: tel ? tel : '暂无手机号',
        })

        if (tel){

          let url1 = '/pages/my_change_phone1/my_change_phone1?tel='+tel;
          that.setData({
            url:url1
          })

        }else{

          let url2 = '/pages/my_change_phone2/my_change_phone2';
          that.setData({
            url: url2
          })
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

  pageTo(e){
    common.pageTo(e)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})