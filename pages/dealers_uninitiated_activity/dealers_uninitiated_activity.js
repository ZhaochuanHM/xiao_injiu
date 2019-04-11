// pages/dealers_uninitiated_activity/dealers_uninitiated_activity.js
const common = require('../../utils/common.js');
const app = getApp();
var loadMoreView;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pop : false,
    message : '',
    datas: { arr: [] },
    currPage: 1,
  },
  changePop(e) {
    var index = e.currentTarget.dataset.index;
    console.log(this.data.datas.arr)
    if(index != -1){
      var message = this.data.datas.arr[index].message;
      this.setData({
        pop: !this.data.pop,
        message : message
      })
    }else{
      this.setData({
        pop: !this.data.pop,
        message : ''
      })
    }
    
  },
  // 阻止冒泡
  nothing() {
    console.log('阻止冒泡')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 未开始的活动列表
    this.no_activity_List();
    loadMoreView = this.selectComponent("#loadMoreView")
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
    var currPage = this.data.currPage + 1;
    this.setData({ currPage: currPage });
    this.no_activity_List();
  },

  /**
   * 点击加载更多
   */
  clickLoadMore: function () {
    this.no_activity_List();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 免费抽奖跳转
   */
  free:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var oldarr = that.data.datas.arr;
    wx.navigateTo({
      url: '/pages/dealers_create_lottery/dealers_create_lottery?wa_id=' + oldarr[index].wa_id
    })
  },

  /**
   * 秒杀跳转
   */
  seckill:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var oldarr = that.data.datas.arr;
    wx.navigateTo({
      url: '/pages/dealers_create_seckill/dealers_create_seckill?wa_id=' + oldarr[index].wa_id
    })
  },

  /**
   * 砍价跳转
   */
  bargainimg: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var oldarr = that.data.datas.arr;
    wx.navigateTo({
      url: '/pages/dealers_create_bargaining/dealers_create_bargaining?wa_id='+oldarr[index].wa_id
    })
  },





  delete_list:function(e){
    let that = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    var index = e.currentTarget.dataset.index;
    var oldarr = that.data.datas.arr;

    wx.showModal({
      title: '提示',
      content: '是否删除该活动？',
      success(res) {
        if (res.confirm) {

          let param = {
            sessionId: sessionId,
            waId: e.currentTarget.dataset.id,
          }

          // 列表加载
          common.common_ajax(url + '?c=Agency&a=delWa', param, true, function (data) {
            if (data.result == 'success') {
             
              oldarr.splice(index, 1);
              that.setData({
                datas: { arr: oldarr }
              })

              wx.showToast({
                title: '删除成功',
                icon: 'none',
                duration: 2000
              })
              
            } else {
              loadMoreView.loadMoreFail();
              wx.showToast({
                title: data.msg,
                icon: 'none',
                duration: 2000
              })
            }
          })
          
        } else if (res.cancel) {


        }
      }
    })
  },
  /**
   * 未开始的活动列表
   */
  no_activity_List: function () {
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      sessionId: sessionId,
      page: this_.data.currPage,
      waStatus: 5,
    }


    // 列表加载
    common.common_ajax(url + '?c=Agency&a=waList', param, true, function (data) {
      console.log(data)
      if (data.result == 'success') {
        var len = data.data.length;

        // loading完成
        loadMoreView.loadMoreComplete(len);
        // console.log(data)
        if (len) {
          var arr = [];
          for (var i = 0; i < data.data.length; i++) {
            var a = data.data[i].examine_status;
            arr.push({
              reward: data.data[i].wa_type_str,
              time: data.data[i].create_time,
              title: data.data[i].wa_name,
              activity_time: data.data[i].start_time + " ~ " + data.data[i].end_time,
              good_img: data.data[i].prize_theme,
              is_pass: data.data[i].examine_status,
              ongoing: a != 1 ? 1 : 0,
              message: data.data[i].examine_reason,
              wa_id: data.data[i].wa_id,
              wa_type: data.data[i].wa_type,
              show_status: 1
            })
            
            
          }

          var newDataList = this_.data.datas.arr.concat(arr);
          this_.setData({
            datas: { arr: newDataList }
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
  }
})