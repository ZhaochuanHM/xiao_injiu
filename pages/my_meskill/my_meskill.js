// pages/my_meskill/my_meskill.js
const common = require('../../utils/common.js');
const app = getApp();
var loadMoreView;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currPage: 1,

    my_meskill: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 未开始的活动列表
    this.init();
    loadMoreView = this.selectComponent("#loadMoreView");
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

  /**
   * 秒杀跳转
   */
  myseckill: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var oldarr = that.data.my_meskill;
    wx.navigateTo({
      url: '/pages/sec_kill/sec_kill?prizeId=' + oldarr[index].prize_id
    })
  },



  init: function () {
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      sessionId: sessionId,
      page: this_.data.currPage,
      wa_type: 2,
    }


    // 列表加载
    common.common_ajax(url + '?c=PersonalCenter&a=personalRob', param, true, function (data) {

      if (data.result == 'success') {
        var len = data.data.length;

        // loading完成
        loadMoreView.loadMoreComplete(len);
        // console.log(data)
        if (len) {
          var my_meskill = [];
          for (var i = 0; i < data.data.length; i++) {
            my_meskill.push({
              img: data.data[i].prize_theme,
              goods_name: data.data[i].prize_name,
              goods_price: data.data[i].now_price + '酒币',
              time: '过期时间：' + data.data[i].deadline_time,
              checkcode: '核奖码：' + data.data[i].prize_check_code,
              prize_id: data.data[i].prize_id,
            })


          }

          var newDataList = this_.data.my_meskill.concat(my_meskill);
          this_.setData({
            my_meskill: newDataList
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