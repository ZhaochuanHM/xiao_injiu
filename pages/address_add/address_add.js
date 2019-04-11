// pages/address_add/address_add.js
const common = require('../../utils/common.js');
const amapFile = require('../../utils/amap-wx.js');
const app = getApp();
let city = '', province = '', district = '';
let userName = '', tel = '', detailInfo = '';
let sessionId = wx.getStorageSync('sessionId');
let url = app.globalData.base_host;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location : '省市区',
    is_check : false,
  },
  /**
   * 定位页面加载
   */
  getAddress(){
    let that = this;
    wx.chooseLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        let location = longitude + ',' + latitude;
        // 地址逆解析
        var myAmapFun = new amapFile.AMapWX({ key: 'bd7c8b5b6b11a875b1f283a68fef8d3f' });
        myAmapFun.getRegeo({
          location: location,
          success: function (data) {
            console.log(data)
            //成功回调
            let res = data[0].regeocodeData.addressComponent;
              city = res.city,
              province = res.province,
              district = res.district,
            that.setData({
              location: city + ' ' + province + ' ' +district
            })
          },
          fail: function (info) {
            //失败回调
            wx.showToast({
              title: '授权失败',
              icon: 'none',
              duration: 2000
            })
          }
        });

      },
    })
  },
  /**
   * switch
   */
  checked(){
    this.setData({
      checked : !this.data.checked
    })
  },
  /**
   * input
   */
  input(e){
    let val = e.detail.value;
    let type = e.currentTarget.dataset.type;
    switch (type){
      case 'user':
        userName = val;
        break;
      case 'tel':
        tel = val;
        break;
      case 'area':
        detailInfo = val;
        break;
      default : break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  save(){
    let is_default = !this.data.checked ? 0 : 1;
    if (userName == '' || tel == '' || province == '' || city == '' || district == '' || detailInfo == ''){
      wx.showToast({
        title: '以上都是必填字段',
        icon: 'none',
        duration: 2000
      })
    }else{
      let param = {
        consignee: userName,
        mobile: tel,
        province: province,
        city: city,
        district: district,
        address: detailInfo,
        is_default: is_default,
        sessionId: sessionId
      }
      //详情加载
      common.common_ajax(url + '?c=Tracingsource&a=userAddAddress', param, true, function (data) {
        if (data.result == 'success') {
          wx.showToast({
            title: data.msg,
            icon: 'success',
            duration: 2000
          });
          setTimeout(function(){
            var pages = getCurrentPages();
            var currPage = pages[pages.length - 1];   //当前页面
            var prevPage = pages[pages.length - 2];  //上一个页面
            //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
            prevPage.addressList();
            wx.navigateBack();
          },2000)
        } else {
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
   
  }
})