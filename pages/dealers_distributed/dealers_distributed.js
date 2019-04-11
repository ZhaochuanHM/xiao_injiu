// pages/dealers_distributed/dealers_distributed.js
const common = require('../../utils/common.js');
const app = getApp();
var loadMoreView;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    index:'',
    checkCode:'',
    dialog:true,
    switch_btn: 0,
    currPage1: 1,
    currPage2: 1,
    waitList:[],
    alreadyList:[]
  },
  /**
   * 按钮切换
   */
  changeTab(e) {
    var index = e.target.dataset.index;
    if (index === this.data.switch_btn) {
      return false;
    } else {
      this.setData({
        switch_btn: index
      })
    }
  },
  /**
   * 收货地址是否可见
   */
  sildeChange(e) {
    var index = e.currentTarget.dataset.index;
    var arr = this.data.waitList;
    if (arr[index].isTop){
      arr[index].isTop = false;
    }else{
      arr[index].isTop = true;
    }
    this.setData({
      waitList: arr
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 代发奖列表
    loadMoreView = this.selectComponent("#loadMoreView");
    this.init_waitList();
    this.init_alreadyList();
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
    // var currPage1 = this.data.currPage1 + 1;
    // this.setData({ currPage1: currPage1 });
    // this.init_waitList();

    // var currPage2 = this.data.currPage2 + 1;
    // this.setData({ currPage2: currPage2 });
    // this.alreadyList();

    var index = this.data.index
    console.log(index)
    if (index == 0) {
      var currPage = this.data.currPage1 + 1;
      this.setData({ currPage1: currPage });
      this.init_waitList();
    } else {
      var currPage = this.data.currPage2 + 1;
      this.setData({ currPage2: currPage });
      this.alreadyList();
    }
  },

  /**
   * 点击加载更多
   */
  clickLoadMore: function () {
    var index = this.data.index
    if (index == 0) {
      this.init_waitList();
    } else {
      this.alreadyList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 拨打手机号
   */
  on_tel:function(e){
    let tel = e.target.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: tel // 真实的电话号码
    })
  },

  //核奖码
  check_code(e) {
    const text = e.detail.value;
    this.setData({
      checkCode: text
    })
  },

  open: function (e) {
    this.setData({
      dialog: false,
      id: e.currentTarget.dataset.wbid,
      index: e.currentTarget.dataset.index
    })
  },

  close:function(e){
    this.setData({
      checkCode:'',
      id:'',
      index:'',
      dialog: true,
    })
  },

  submit:function(e){
    var that = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    var oldarr = that.data.waitList;
    var index = that.data.index;
    let param = {
      sessionId: sessionId,
      wbId: that.data.id,
      checkCode: that.data.checkCode,
    }
    // 列表加载
    common.common_ajax(url + '?c=Agency&a=distributePrize', param, true, function (data) {
      if (data.result == 'success') {
        wx.showToast({
          title: '核奖成功',
          icon: 'success',
          duration: 2000
        })

        oldarr.splice(index, 1);
        that.setData({
          waitList: oldarr
        })

        that.close();

        // 重新加载已派奖列表
        that.setData({alreadyList:[]})
        that.init_alreadyList();

      } else {
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  init_waitList:function(){
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      sessionId: sessionId,
      page: this_.data.currPage1,
      distribute: 0,
    }


    // 列表加载
    common.common_ajax(url + '?c=Agency&a=distributePrizeList', param, true, function (data) {
      if (data.result == 'success') {
        var len = data.data.length;
        

        // loading完成
        loadMoreView.loadMoreComplete(len);

        if (len) {
          var waitList = [];
          for (var i = 0; i < data.data.length; i++) {
            //实物
            if (data.data[i].prize_type == 1 && data.data[i].address_id == 0){
              var coin1 = false;
              var coin2 = true;
              var coin3 = false;
              var coin4 = true;
              var coin5 = false;
            } else if (data.data[i].prize_type == 1 && data.data[i].address_id != 0){
              var coin1 = true;
              var coin2 = true;
              var coin3 = false;
              var coin4 = false;
              var coin5 = true;

            }else if (data.data[i].prize_type == 2){
              var coin1 = this;
              var coin2 = false;
              var coin3 = true;
              var coin4 = false;
              var coin5 = true;
            }

            // if (data.data[i].address_id == 0){
            //   var coin1 = false;
            //   var coin4 = true;
            //   var coin5 = false;
            // }else{
            //   var coin1 = true;
            //   var coin4 = false;
            //   var coin5 = true;
            // }
            waitList.push({
              type: data.data[i].wa_type_str,
              time: '活动时间：'+data.data[i].start_time + '~' + data.data[i].start_time,
              img: data.data[i].prize_theme,
              gift:'奖品：'+data.data[i].prize_name,
              price: data.data[i].now_price + '酒币',
              overdue:'过期时间：'+ data.data[i].deadline_time,
              people_name: data.data[i].consignee,
              people_tel: data.data[i].mobile,
              people_address: data.data[i].province + data.data[i].city + data.data[i].district + data.data[i].address,
              wb_id: data.data[i].wb_id,
              isTop: false,
              coin1: coin1,
              coin2: coin2,
              coin3: coin3,
              coin4: coin4,
              coin5: coin5,
            
            })
          }

          var newDataList = this_.data.waitList.concat(waitList);
          this_.setData({
            waitList: newDataList
          })
        }else{

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


  init_alreadyList: function () {
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      sessionId: sessionId,
      page: this_.data.currPage2,
      distribute: 1,
    }


    // 列表加载
    common.common_ajax(url + '?c=Agency&a=distributePrizeList', param, true, function (data) {
      if (data.result == 'success') {
        var len = data.data.length;


        // loading完成
        loadMoreView.loadMoreComplete(len);

        if (len) {
          var alreadyList = [];
          for (var i = 0; i < data.data.length; i++) {
            alreadyList.push({
              type: data.data[i].wa_type_str,
              time: '活动时间：' + data.data[i].start_time + '~' + data.data[i].start_time,
              img: data.data[i].prize_theme,
              gift: '奖品：' + data.data[i].prize_name,
              price: data.data[i].now_price + '酒币',
              overdue: '过期时间：' + data.data[i].deadline_time,
              
            })
          }

          var newDataList = this_.data.alreadyList.concat(alreadyList);
          this_.setData({
            alreadyList: newDataList
          })
        }else{
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


})