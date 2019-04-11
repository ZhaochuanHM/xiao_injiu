// pages/exchange_detail/exchange_detail.js
const common = require('../../utils/common.js');
const app = getApp();
let page = 1;
let sessionId = wx.getStorageSync('sessionId');
let goodsId = '';
let location = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    none: false,
    isShow: false,
    // 存入状态
    store_stute: 0,
    // 存酒显示
    is_store: false,
    // 数据绑定
    data: {},
    need_coin: '',
    logs: [],
    goods_brief: '',
    // 酒币存酒
    reduce_url0: '../../images/popup_btn_reduce_dis@2x.png',
    reduce_url1: '../../images/popup_btn_reduce@2x.png',
    add_url0: '../../images/popup_btn_add_dis@2x.png',
    add_url1: '../../images/popup_btn_add@2x.png',
    reduce: false,
    add: true,
    my_coin: 1000,
    should_coin: 0,
    store_volume: 0,
    maxVolume: ''
  },
  // 兑换弹窗
  convertible() {
    let this_ = this;
    let url = app.globalData.base_host;
    let param = {
      sessionId: sessionId
    }
    common.common_ajax(url + '?c=Tracingsource&a=defaultAddress', param, true, function(data) {
      if (data.result == 'success') {
        wx.navigateTo({
          url: '/pages/exchange_success/exchange_success?goodsId=' + goodsId,
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '选择收货地址',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/address_list/address_list?goodsId=' + goodsId + "&type=no_default",
              })
            } else if (res.cancel) {
              wx.showToast({
                title: '取消兑换',
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      }
    })
  },
  // 展示记录弹窗
  showPop(e) {
    let that = this;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      goodsId: goodsId,
      page: page,
      sessionId: sessionId
    }
    this.loadMore(param);
    this.setData({
      isShow: !this.data.isShow
    })
  },
  // 阻止冒泡
  nothing() {
    console.log('阻止冒泡')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let url = app.globalData.base_host;
    goodsId = options.id;
    let need_coin = options.coin;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      goodsId: goodsId,
      sessionId: sessionId
    }
    //详情加载
    common.common_ajax(url + '?c=GoodsExchange&a=goodsInfo', param, true, function(data) {
      if (data.result == 'success') {
        var data = data.data;
        var goods_brief = data.goods_brief.replace('/\n/g', '\n');
        // 存入状态
        var is_could_store = data.is_could_store;
        var store_volume = data.store_volume;
        var goods_volume = data.goods_volume;
        let store_stute = goods_volume == store_volume ? 2 : is_could_store;
        that.setData({
          data: data,
          need_coin: need_coin,
          goods_brief: goods_brief,
          store_stute: store_stute,
          maxVolume: goods_volume
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
  // 加载更多
  loadMore(param) {
    let that = this;
    that.setData({
      show: true
    })
    let url = app.globalData.base_host;
    //详情加载
    common.common_ajax(url + '?c=GoodsExchange&a=goodsStoreLog', param, true, function(data) {
      if (data.result == 'success') {
        var data = data.data;
        var arr = that.data.logs;
        let oldLength = arr.length;
        for (let i = 0; i < data.length; i++) {
          arr.push(data[i])
        }
        let newLength = arr.length;
        if (newLength > oldLength) {
          setTimeout(function() {
            that.setData({
              show: false,
              logs: arr
            });
          }, 1000)
        } else {
          that.setData({
            show: false,
            none: true
          })
        }

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
    console.log(111)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 下拉加载
  bindDownLoad() {
    page++;
    let that = this;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      goodsId: goodsId,
      page: page,
      sessionId: sessionId
    }
    this.loadMore(param);
    wx.getSystemInfo({
      success: (res) => {
        console.log(res);
        this.setData({
          scrollHeight: res.windowHeight
        })
      }
    })
  },
  // 存酒
  store() {
    this.setData({
      is_store: true
    })
  },
  // 减量
  reduce() {
    let store_volume = this.data.store_volume;
    store_volume -= 100;
    let should_coin = (store_volume / 100) * this.data.need_coin;
    if (store_volume > 0) {
      this.setData({
        store_volume: store_volume,
        add: true,
        should_coin: should_coin,
        reduce: true
      })
    } else {
      this.setData({
        store_volume: store_volume,
        add: true,
        should_coin: should_coin,
        reduce: false
      })
    }
  },
  // 加量
  add() {
    let maxVolume = this.data.maxVolume;
    let store_volume = this.data.store_volume;
    store_volume += 100;
    let should_coin = (store_volume / 100) * this.data.need_coin;
    if (store_volume < maxVolume) {
      this.setData({
        store_volume: store_volume,
        add: true,
        reduce: true,
        should_coin: should_coin
      })
    } else {
      this.setData({
        store_volume: store_volume,
        add: false,
        should_coin: should_coin,
        reduce: true
      })
    };
  },
  cancel_store() {
    this.setData({
      is_store: !this.data.is_store
    })
  },
  // 存酒
  storeVolume() {
    let that = this;
    let should_coin = this.data.should_coin;
    let my_coin = this.data.my_coin;
    let store_volume = this.data.store_volume
    let url = app.globalData.base_host;
    if (0 < should_coin < my_coin) {
      let param = {
        sessionId: sessionId,
        goodsId: goodsId,
        storeVolume: store_volume
      }
      //详情加载
      common.common_ajax(url + '?c=GoodsExchange&a=goodsStore', param, true, function(data) {
        if (data.result == 'success') {
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 2000
          });
          setTimeout(function() {
            that.setData({
              is_store: false,
            })
            wx.navigateTo({
              url: '/pages/exchange/exchange',
            })
          }, 2000)
        } else {
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      })
    } else {
      wx.showToast({
        title: '酒币不足或者未选择存酒量',
        icon: 'none'
      })
    }
  }
})