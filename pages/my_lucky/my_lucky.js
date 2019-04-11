// pages/my_lucky/my_lucky.js
const common = require('../../utils/common.js');
// app
const app = getApp();
var loadMoreView;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index : 0,
    currPage1 : 1,
    currPage2 : 1,
    // 免费抽奖列表
    listDraw : [],
    // 中奖记录列表
    listDrawWinning : []
  },

  changeTab(e){
    var index = e.target.dataset.index;
    if(index === this.data.index){
      return false;
    }else{
      this.setData({
        index : index
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    loadMoreView = this.selectComponent("#loadMoreView")
    this.waList();
    this.winningList();
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
    var index = this.data.index
    if (index == 0){
      var currPage = this.data.currPage1 + 1;
      this.setData({ currPage1: currPage });
      this.waList();
    }else{
      var currPage = this.data.currPage2 + 1;
      this.setData({ currPage2: currPage });
      this.winningList();
    }
    
  },

  /**
   * 点击加载更多
   */
  clickLoadMore: function () {
    var index = this.data.index
    if (index == 0) {
      this.waList();
    } else {
      this.winningList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 抽奖跳转1
   */
  mylottery1: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var oldarr = that.data.listDraw;
    wx.navigateTo({
      url: '/pages/lottery_draw/lottery_draw?wa_id=' + e.currentTarget.dataset.id
    })
  },

  /**
   * 抽奖跳转2
   */
  mylottery2: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var oldarr = that.data.listDrawWinning;
    wx.navigateTo({
      url: '/pages/lottery_draw/lottery_draw?wa_id=' + e.currentTarget.dataset.id
    })
  },

  /**
   * 免费抽奖
   */
  waList: function () {
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      sessionId: sessionId,
      page: this_.data.currPage1,
    }

    // 列表加载
    common.common_ajax(url + '?c=PersonalCenter&a=personal_Free', param, true, function (data) {
      console.log(data)
      if (data.result == 'success') {
        var len = data.data.length;
        // loading完成
        loadMoreView.loadMoreComplete(len);

        if (len) {
          // 重新渲染数据
          var newDataList = this_.data.listDraw.concat(data.data);
          this_.setData({
            listDraw: newDataList
          })
        
        } else {
          // 请求页数不变
          var currPage = this_.data.currPage1 - 1;
          this_.setData({ currPage1: currPage })
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
  },

  /**
   * 中奖记录
   */
  winningList: function () {
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      sessionId: sessionId,
      page: this_.data.currPage2,
    }

    // 列表加载
    common.common_ajax(url + '?c=PersonalCenter&a=prize_in_log', param, true, function (data) {
      console.log(data)
      if (data.result == 'success') {
        var len = data.data.length;
        // loading完成
        loadMoreView.loadMoreComplete(len);

        if (len) {

          var listDrawWinning = [];
          for (var i = 0; i < data.data.length; i++) {
            listDrawWinning.push({
              type: data.data[i].wa_type_str,
              time: '活动时间' + data.data[i].start_time + ' ~ ' + data.data[i].end_time,
              img: data.data[i].prize_theme,
              goods: data.data[i].prize_name,
              checkcode: '核奖码：' + data.data[i].prize_check_code,
              wa_id:data.data[i].wa_id,
            })


          }


          // 重新渲染数据
          var newDataList = this_.data.listDrawWinning.concat(listDrawWinning);
          this_.setData({
            listDrawWinning: newDataList
          })
        
        } else {
          // 请求页数不变
          var currPage = this_.data.currPage2 - 1;
          this_.setData({ currPage2: currPage })
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
  },
  copyText: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.code,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
})