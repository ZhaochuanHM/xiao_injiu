// pages/banquet_apply/banquet_apply.js
const common = require('../../utils/common.js');
const amapFile = require('../../utils/amap-wx.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    array: ['请选择','美国', '中国', '巴西', '日本'],
    date: '',
    time: '',
    area : '省市区'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.formatDate();
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

  /**
   * 格式化日期
   */
  formatDate: function () {
    let this_ = this;
    let date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let nowDate =  y + '-' + m + '-' + d;
    let time = date.getHours() + ':' + date.getMinutes()
    this_.setData({
      date : nowDate,
      time : time
    })
  }, 
  /**
   * 用酒名称picker
   */
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  /**
   * 日期picker
   */
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  /**
   * 时间picker
   */
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  /**
   * 选择地区
   */
  areaChoose:function(){
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
            let  city = res.city;
            let  province = res.province;
            let  district = res.district;
            that.setData({
              area: city + ' ' + province + ' ' + district
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
  }
})