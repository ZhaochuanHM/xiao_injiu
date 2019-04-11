// pages/my/my.js
// common.js
const common = require('../../utils/common.js');
const amapFile = require('../../utils/amap-wx.js');
// app
const app = getApp();
// 获取定位
function getLocation() {
  wx.getLocation({
    type: 'wgs84',
    success(res) {
      let latitude = res.latitude;
      let longitude = res.longitude;
      const speed = res.speed;
      const accuracy = res.accuracy;
      let location = longitude + ',' + latitude;
      // 地址逆解析
      var myAmapFun = new amapFile.AMapWX({ key: 'bd7c8b5b6b11a875b1f283a68fef8d3f' });
      myAmapFun.getRegeo({
        location: location,
        success: function (data) {
          //成功回调
          let res = data[0].regeocodeData.addressComponent;
          let address = {
            city: res.city,
            province: res.province,
            district: res.district,
            latitude: latitude,
            longitude: longitude,
          }
          // 地址缓存
          wx.setStorageSync('address', address);
          console.log(address);
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
    fail(res) {
      //失败回调
      wx.showToast({
        title: '获取定位失败',
        icon: 'none',
        duration: 2000
      })
    }
  });
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // banner
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    // nav
    item_text1: '扫码抽奖',
    item_img1: '../../images/btn1.png',

    item_text2: '产品溯源',
    item_img2: '../../images/btn2.png',

    item_text3: '酒币兑换',
    item_img3: '../../images/btn3.png',

    item_text4: '娱乐游戏',
    item_img4: '../../images/btn4.png',
    // tabar
    current: '1',
    content1: true,
    content2:false,
    content3:false,

    /**
     * 活动
    */
    // 进行中
    processing: [],
    // 结束
    over: [],
    // 未开始
    ready : [],

    load_more1:false,
    load_more2:false,
    // 红包
    red_packet_img:'../../images/red_packet.png'
  },

  handleChange({ detail }) {
    this.setData({current: detail.key});
    if(detail.key == 2){
      this.setData({ content1: false });
      this.setData({ content2: true });
      this.setData({ content3: false });
    } else if (detail.key == 3){
      this.setData({ content1: false });
      this.setData({ content2: false});
      this.setData({ content3: true });
    }else{
      this.setData({ content1: true });
      this.setData({ content2: false });
      this.setData({ content3: false });
    }
  },
  pull_upload(){
    // this.setData({load_more1:true});
  },
  /**
   * 页面跳转
   */
  pageTo(e){
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则无法获取您所需数据',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '授权失败',
                  icon: 'success',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用getLocationt的API
                      getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {//初始化进入
          getLocation();
        }
        else { //授权后默认加载
          getLocation();
        }
      }
    })
    let that = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      sessionId : sessionId
    }
    // 活动加载
    common.common_ajax(url + '?c=Tracingsource&a=Listactivity', param,true,function(data){
      if (data.result == 'success'){
        var data = data.data;
        let processing = data.ing;
        let over = data.end_time;
        let ready = data.start_time;
        that.setData({
          processing: processing,
          load_more2: !that.data.load_more2,
          over  : over,
          ready  : ready
        })
      }else{
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    // banner加载
    common.common_ajax(url + '?c=Tracingsource&a=showBanner', param, true, function (data) {
      if (data.result == 'success') {
        var data = data.data;
        let imgUrls = data;
        that.setData({
          imgUrls: imgUrls
        })
      } else {
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    wx.setTabBarBadge({
      index: 2,
      text: '22'
    })
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
})
