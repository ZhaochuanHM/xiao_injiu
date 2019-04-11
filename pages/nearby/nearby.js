// pages/nearby/nearby.js
const common = require('../../utils/common.js');
// app
const app = getApp();
var loadMoreView;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address_img1:'../../images/address.png',
    search_img:'../../images/search.png',
    list_img:'https://jsq-show.oss-cn-shenzhen.aliyuncs.com/in-wine/default-prize8.png',
    liveness_img:'../../images/activity.png',
    currLocation: '',
    keywords:'',
    currPage:1,
    // 商户列表
    merchantList:[],
  },

  url_info: function (e) {
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/nearby_merchant_info/nearby_merchant_info?mid=' + data.mid + '&distance=' + data.distance
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let location = wx.getStorageSync('address');
    this.setData({ currLocation: location.district});
    loadMoreView = this.selectComponent("#loadMoreView")  
    // 商户列表
    this.merchantList();
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
  loadMoreListener: function(){
    var currPage = this.data.currPage + 1;
    this.setData({ currPage: currPage});
    this.merchantList();
  },

  /**
   * 点击加载更多
   */
  clickLoadMore: function(){
    this.merchantList();
  },

  /**
   * 拨打电话
   */
  callNumber: function(e){
    var data = e.currentTarget.dataset;
    wx.makePhoneCall({
      phoneNumber: data.tel
    })
  },

  /**
   * 导航
   */
  navigation: function (e) {
    var data = e.currentTarget.dataset;
    wx.openLocation({//​使用微信内置地图查看位置。
      latitude: parseFloat(data.lat),  //要去的纬度-地址
      longitude: parseFloat(data.lng), //要去的经度-地址
      name: data.name,
      address: data.address
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 设置输入关键字
   */
  setKeywords: function(e){
    this.setData({
      keywords: e.detail.value
    });
  },

  /**
   * 搜索商户
   */
  searchMerchant: function(){
    this.setData({
      currPage: 1,
      merchantList: []
    })
    this.merchantList();
  },

  /**
   * 商户列表
   */
  merchantList: function(){
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let location = wx.getStorageSync('address');
    let param = {
      sessionId: sessionId,
      longitude: location.longitude,
      latitude: location.latitude,
      page: this_.data.currPage,
    }
    let keywords = this_.data.keywords;
    if (keywords) param.keywords = keywords;

    // 列表加载
    common.common_ajax(url + '?c=Merchant&a=showMerchant', param, true, function (data) {
      if (data.result == 'success') {
        var len = data.data.length;
        // loading完成
        loadMoreView.loadMoreComplete(len);

        if (len){
          // 重新渲染数据
          var newDataList = this_.data.merchantList.concat(data.data);
          this_.setData({
            merchantList: newDataList
          })
        }else{
          // 请求页数不变
          var currPage = this_.data.currPage - 1;
          this_.setData({currPage: currPage})
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