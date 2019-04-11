// pages/welfare/welfare.js
const common = require('../../utils/common.js');
// app
const app = getApp();
var loadMoreView;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    welfare_box1: true,
    welfare_box2: false,
    welfare_box3: false,
    // 分页
    currPage: 1,
    lotteryList: [],
    goodsList: [],
    waType: 1
  },

  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key,
      currPage: 1
    });
    if (detail.key == 2) {
      this.setData({
        welfare_box1: false,
        welfare_box2: true,
        welfare_box3: false,
        goodsList: [],
        waType: 3
      })
      this.goodsList();
    } else if (detail.key == 3) {
      this.setData({
        welfare_box1: false,
        welfare_box2: false,
        welfare_box3: true,
        goodsList: [],
        waType: 2
      })
      this.goodsList();
    } else {
      this.setData({
        welfare_box1: true,
        welfare_box2: false,
        welfare_box3: false,
        lotteryList: [],
        waType: 1
      })
      this.lotteryList();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    loadMoreView = this.selectComponent("#loadMoreView")
    let type = this.data.waType;
    switch (type) {
      case 1:
        this.lotteryList();
        break;
      case 2:
        this.goodsList();
        break;
      case 3:
        this.goodsList();
        break;
      default:
        break;
    }
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
    let this_ = this;
    this_.data.currPage = 1;
    this_.data.lotteryList = [];
    this_.data.goodsList = [];
    wx.showNavigationBarLoading();
    setTimeout(function() {
      let type = this_.data.waType;
      switch (type) {
        case 1:
          this_.lotteryList();
          break;
        case 2:
          this_.goodsList();
          break;
        case 3:
          this_.goodsList();
          break;
        default:
          break;
      }
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    loadMoreView.loadMore();
  },
  /**
   * 监听加载更多
   */
  loadMoreListener: function() {
    var currPage = this.data.currPage + 1;
    this.setData({
      currPage: currPage
    });
    let type = this.data.waType;
    switch (type) {
      case 1:
        this.lotteryList();
        break;
      case 2:
        this.goodsList();
        break;
      case 3:
        this.goodsList();
        break;
      default:
        break;
    }
  },

  /**
   * 点击加载更多
   */
  clickLoadMore: function() {
    let type = this.data.waType;
    switch (type) {
      case 1:
        this.lotteryList();
        break;
      case 2:
        this.goodsList();
        break;
      case 3:
        this.goodsList();
        break;
      default:
        break;
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 抽奖列表
   */
  lotteryList: function() {
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let location = wx.getStorageSync('address');
    let param = {
      sessionId: sessionId,
      province: location.province,
      city: location.city,
      district: location.district,
      page: this_.data.currPage,
    }
    // 列表加载
    common.common_ajax(url + '?c=FreeLottery&a=FreeLotteryList', param, true, function(data) {
      if (data.result == 'success') {
        var len = data.data.length;
        // loading完成
        loadMoreView.loadMoreComplete(len);

        if (len) {
          // 重新渲染数据
          var newDataList = this_.data.lotteryList.concat(data.data);
          this_.setData({
            lotteryList: newDataList
          })
        } else {
          // 请求页数不变
          var currPage = this_.data.currPage - 1;
          this_.setData({
            currPage: currPage
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
  },
  /**
   * 抢购列表
   */
  goodsList: function() {
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let location = wx.getStorageSync('address');
    let waType = this_.data.waType
    let param = {
      waType: waType,
      sessionId: sessionId,
      province: location.province,
      city: location.city,
      district: location.district,
      page: this_.data.currPage,
    }
    // 列表加载
    common.common_ajax(url + '?c=WelfareActivity&a=waPrizeList', param, true, function(data) {
      if (data.result == 'success') {
        var len = data.data.length;
        // loading完成
        loadMoreView.loadMoreComplete(len);

        if (len) {
          // 重新渲染数据
          var newDataList = this_.data.goodsList.concat(data.data);
          this_.setData({
            goodsList: newDataList
          })
        } else {
          // 请求页数不变
          var currPage = this_.data.currPage - 1;
          this_.setData({
            currPage: currPage
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
  },
  /**
   * 详情页跳转
   * */ 
  detailPage:function(e){
    let this_ = this;
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    let type = this_.data.waType;
    let url,data;
    switch(type){
      // 抽奖
      case 1 : 
        url = '/pages/lottery_draw/lottery_draw?wa_id=' + id;
        break;
        // 秒杀
      case 2:
        url = '/pages/sec_kill/sec_kill?prizeId=' + id
        break;
        // 抢购
      case 3:
        url = '/pages/rush_to_buy/rush_to_buy?prizeId=' + id
        break;
     default:
        break;
    }
    wx.navigateTo({
      url : url
    })
  }
})