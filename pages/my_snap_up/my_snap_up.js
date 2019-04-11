// pages/my_snap_up/my_snap_up.js
const common = require('../../utils/common.js');
const app = getApp();
var loadMoreView;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    currPage: 1,

    my_snap_up:[]
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
   * 抢购跳转
   */
  my_snap_up: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var oldarr = that.data.my_snap_up;
    wx.navigateTo({
      url: '/pages/rush_to_buy_people/rush_to_buy_people?prizeId=' + oldarr[index].prize_id
    })
  },

  init:function(){
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      sessionId: sessionId,
      page: this_.data.currPage,
      wa_type: 3,
    }


    // 列表加载
    common.common_ajax(url + '?c=PersonalCenter&a=personalRob', param, true, function (data) {

      if (data.result == 'success') {
        var len = data.data.length;

        // loading完成
        loadMoreView.loadMoreComplete(len);
        // console.log(data)
        if (len) {
          var my_snap_up = [];
          for (var i = 0; i < data.data.length; i++) {
            my_snap_up.push({
              img: data.data[i].prize_theme,
              goods_name: data.data[i].prize_name,
              prize_id: data.data[i].prize_id,
              goods_price: data.data[i].now_price + '酒币',
              time: '过期时间：' + data.data[i].deadline_time,
              checkcode: '核奖码：'+data.data[i].prize_check_code,
            })


          }

          var newDataList = this_.data.my_snap_up.concat(my_snap_up);
          this_.setData({
            my_snap_up: newDataList 
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