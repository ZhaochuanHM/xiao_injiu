// pages/my_exchange/my_exchange.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [{
      url: 'https://jsq-show.oss-cn-shenzhen.aliyuncs.com/in-wine/default-prize10.png',
        good_name: "五粮春45度-500ml",
        state: 0,
        kind: '',
        code: '',
        name : '李晓霞',
        tel: '13212345678',   
        address: '四川省成都市武侯区益州大道中段1999号阿里阿里阿里巴巴10F',
        status: false
      },
      {
        url: 'https://jsq-show.oss-cn-shenzhen.aliyuncs.com/in-wine/default-prize10.png',
        good_name: "五粮春45度-500ml",
        state: 1,
        kind: '中通快递',
        name: '李晓霞',
        tel: '13212345678',
        address: '四川省成都市武侯区益州大道中段1999号阿里阿里阿里巴巴10F',
        code: '514582465487',
        status: false
      }
    ]
  },
  changeShow(e) {
    var index = e.currentTarget.dataset.index;
    var missionArr = this.data.arr;
    missionArr[index].status = !missionArr[index].status;
    this.setData({
      arr: missionArr
    })
  },
  changeAddress(e) {
    var index = e.currentTarget.dataset.index;
    var that = this;
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function(res) {
          // console.log(JSON.stringify(res));
          // console.log(res);
          var missionArr = that.data.arr;
          missionArr[index].name = res.userName;
          missionArr[index].tel = res.telNumber;
          missionArr[index].address = res.provinceName + res.cityName + res.countyName + res.detailInfo;
          that.setData({
            arr: missionArr
          });
          wx.showToast({
            title: '地址修改成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function(err) {
          // console.log(JSON.stringify(err));
          // console.info("收货地址授权失败");
          // wx.showToast({
          //   title: '授权失败，您将无法进行下单支付;重新授权请删除小程序后再次进入',
          //   icon: 'success',
          //   duration: 2000
          // })
        }
      })
    } else {
      console.log('当前微信版本不支持chooseAddress');
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})