// pages/address_list/address_list.js
const common = require('../../utils/common.js');
// app
const app = getApp();
var loadMoreView;
let type = '',goodsId = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultUrl: '/images/ads_default_selection.png' ,
    defaultUrl1: '/images/ads_default.png',
    addressList :''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    type = options.type;
    goodsId = options.goodsId;
    this.addressList();
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
   * 地址列表
   * */ 
  addressList() {
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      sessionId: sessionId
    }
    common.common_ajax(url + '?c=Tracingsource&a=userShowAddress', param, true, function (data) {
      if (data.result == 'success') {
        let addressList = data.data
        this_.setData({
          addressList: addressList
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
  /**
   * 改变默认状态
   * */
  changeDefault(e){
    let this_ = this;
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      is_default : 1,
      address_id : id,
      sessionId: sessionId
    }
    common.common_ajax(url + '?c=Tracingsource&a=addressIsDefault', param, true, function (data) {
      if (data.result == 'success') {
        this_.addressList()
      } else {
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  /**
   * 删除
   * */
  delete(e){
    let this_ = this;
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      address_id: id,
      sessionId: sessionId
    }
    common.common_ajax(url + '?c=Tracingsource&a=userDeleteAddress', param, true, function (data) {
      if (data.result == 'success') {
        this_.addressList()
      } else {
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  /**
   * 跳转新增
   * 跳转编辑
   * */
  pageTo(e){
    common.pageTo(e);
  } ,
  /**
   * 地址选择
   * */
  choiceAddress(e) {
    console.log(type);
    let this_ = this;
    let index = e.currentTarget.dataset.index;
    let checked_address = this_.data.addressList[index];
    if(type == 'changeAddress'){
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        address: checked_address
      })
      wx.navigateBack();
    } else if (type == 'no_default'){
      wx.navigateTo({
        url: '/pages/exchange_success/exchange_success?goodsId=' + goodsId + '&address=' + JSON.stringify(checked_address),
      })
    } else if(type == 'prize'){
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        address : checked_address
      })
      prevPage.postAddress();
      wx.navigateBack();
    } else if (type == 'secKill'){
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        address: checked_address
      })
      prevPage.postAddress();
      wx.navigateBack();
    } else if (type == 'lottery') {
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        address: checked_address
      })
      prevPage.postAddress();
      wx.navigateBack();
    }
    
  }
})