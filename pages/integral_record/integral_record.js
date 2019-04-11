// pages/integral_record/integral_record.js
const common = require('../../utils/common.js');
const app = getApp();
var loadMoreView;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currPage: 1,
    down: true,
    arr: [],
    // arr: [
    //   {
    //     title: '签到',
    //     time: '2018-02-02  19:48:00',
    //     change: 1
    //   },
    //   {
    //     title: '扫码查真伪',
    //     time: '2018-02-02  19:48:00',
    //     change: 20
    //   },
    //   {
    //     title: '兑换XXX',
    //     time: '2018-02-02  19:48:00',
    //     change: -92
    //   },
    //   {
    //     title: '酒币充值',
    //     time: '2018-02-02  19:48:00',
    //     change: 200
    //   }
    // ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 积分明细列表
    this.init();
    loadMoreView = this.selectComponent("#loadMoreView") 
    

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
    loadMoreView.loadMore();
  },

  /**
   * 监听加载更多
   */
  loadMoreListener: function () {
    var currPage = this.data.currPage + 1;
    this.setData({ currPage: currPage });
    this.init();
  },

  /**
   * 点击加载更多
   */
  clickLoadMore: function () {
    this.init();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  init:function(){
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      sessionId: sessionId,
      page: this_.data.currPage,
      user_type: 2,
    }


    // 列表加载
    common.common_ajax(url + '?c=PersonalCenter&a=AlcoholCurrency', param, true, function (data) {
      if (data.result == 'success') {
        var len = data.data.length;

        // loading完成
        loadMoreView.loadMoreComplete(len);

        if (len) {
          var arr = [];
          for (var i = 0; i < data.data.length; i++) {
            arr.push({
              title: data.data[i].describe,
              time: data.data[i].create_time,
              change: data.data[i].change_num,
            })
          }

          var newDataList = this_.data.arr.concat(arr);
          this_.setData({
            arr: newDataList
          })
        }

      } else {
        loadMoreView.loadMoreFail();
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})