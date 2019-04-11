// pages/participation_lottery/participation_lottery.js
const common = require('../../utils/common.js');
// app
const app = getApp();
let url = app.globalData.base_host;
let sessionId = wx.getStorageSync('sessionId');
let location = wx.getStorageSync('address');
var loadMoreView;
let wa_id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    people_list_img: [
      { id: 1, url: '../../images/people_photo.jpg' },
      { id: 2, url: '../../images/people_photo.jpg' },
      { id: 3, url: '../../images/people_photo.jpg' },
      { id: 4, url: '../../images/people_photo.jpg' },
      { id: 5, url: '../../images/people_photo.jpg' },
      { id: 6, url: '../../images/people_photo.jpg' },
      { id: 5, url: '../../images/people_photo.jpg' },
      { id: 6, url: '../../images/people_photo.jpg' },
      { id: 5, url: '../../images/people_photo.jpg' },
      { id: 6, url: '../../images/people_photo.jpg' },
      { id: 5, url: '../../images/people_photo.jpg' },
      { id: 6, url: '../../images/people_photo.jpg' },
    ],
    currPage : 1,
    DataList : [],
    userNub : '',
    loadMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wa_id = options.id;
    loadMoreView = this.selectComponent("#loadMore")
    this.userHeadImg()
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
   * 点击加载更多
   */
  clickLoadMore: function () {
    var currPage = this.data.currPage + 1;
    this.setData({ currPage: currPage });
    loadMoreView.loadMore();
    this.userHeadImg();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 参与者列表
   */
  userHeadImg : function () {
    let this_ = this;
    let param = {
      sessionId: sessionId,
      wa_id: wa_id,
      total: '',
      page: this_.data.currPage,
    }
    // 列表加载
    common.common_ajax(url + '?c=FreeLottery&a=user_in_prize', param, true, function (data) {
      if (data.result == 'success') {
        var len = data.data.length;
        // loading完成
        loadMoreView.loadMoreComplete(len);
        if (len) {
          // 重新渲染数据
          var newDataList = this_.data.DataList.concat(data.data);
          this_.setData({
            userNub : newDataList.length,
            DataList: newDataList
          })
        } else {
          // 请求页数不变
          var currPage = this_.data.currPage - 1;
          this_.setData({ 
            loadMore : false,
            currPage: currPage 
            })
        }

      } else {
        loadMoreView.loadMoreFail();
        this_.setData({
          loadMore : false
        })
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})