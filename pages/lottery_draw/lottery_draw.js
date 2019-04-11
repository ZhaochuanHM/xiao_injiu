// pages/lottery_draw/lottery_draw.js
const common = require('../../utils/common.js');
// app
const app = getApp();
var loadMoreView;
let location = wx.getStorageSync('address');
let prizeId, waId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    joinImg:'/images/join.png',
    waitImg:'/images/wait.png',
    winingImg:'/images/success.png',
    failureImg:'/images/error.png',

    showmask:false,
    // 开奖状态
    status : 0,
    // 信息
    dataList :{},
    // 是否参与
    isJoin : 0,
    // 是否中奖
    isWining : false,
    // 中奖信息
    winingData : {},
    // 地址展示
    addressShow : false,
    // 高度
    height : false,
    // 地址
    address : {},
    // 是否展示地址
    showAddress : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let this_ = this;
    waId = options.wa_id;
    this.lotteryDetail();
    setTimeout(function(){
      let status = this_.data.status
      if(status == 1){
        this_.Wining();
      }
    },100)
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
  onShareAppMessage: function (res) {
    let this_ = this;
    console.log(res)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'IN酒-免费抽奖',
      path: '/pages/lottery_draw/lottery_draw?wa_id=' + waId,
      imageUrl: this_.data.goodsData[0].prize_theme
    }
  },

  /**
   * 抽奖详情
   */
  lotteryDetail : function(){
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      wa_id: waId,
      sessionId: sessionId
    }
    // 列表加载
    common.common_ajax(url + '?c=FreeLottery&a=detiles', param, true, function (data) {
      if (data.result == 'success') {
        let newdataList = data.data;
        // 开奖状态
        let status = newdataList.opening_status;
        // 参加状态
        let isJoin = newdataList.activity;
        // 奖品信息
        let goodsData = newdataList.prize;
        // 用户头像
        let userImg;
        if (newdataList.user_head){
          userImg = newdataList.user_head.length < 8 ? newdataList.user_head : newdataList.user_head.splice(7, newdataList.user_head.length - 7) 
        }else{
          userImg = newdataList.user_head
        }
        this_.setData({
          status: status,
          isJoin: isJoin,
          goodsData: goodsData,
          dataList: newdataList
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
   * 查看全部
   */
  userAll : function(){
    let wa_id = waId;
    wx.navigateTo({
      url: '/pages/participation_lottery/participation_lottery?id=' + wa_id,
    })
  },

  /**
   * 参与抽奖
   */
  jionLottery : function(){
    wx.showLoading({
      title: '参与中...',
    })
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let prize = this_.data.dataList.prize;
    console.log(prize);
    let prize_id = '';
    for (let i = 0; i < prize.length;i++){
      prize_id += prize[i].prize_id + '|@|'
    }
    prize_id = prize_id.substring(0, prize_id.length-3);
    console.log(prize_id);

    let wa_type = this_.data.dataList.wa_type;
    let opening_condition = this_.data.dataList.opening_condition;
    let param = {
      wa_id: waId,
      join_type: wa_type,
      prize_id: prize_id,
      opening_condition: opening_condition,
      sessionId: sessionId,
    }
    // 参加活动
    common.common_ajax(url + '?c=FreeLottery&a=participate_prize', param, true, function (data) {
      if (data.result == 'success') {
        wx.hideLoading();
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 1500
        })
        setTimeout(function(){
          this_.lotteryDetail();
          setTimeout(function () {
            let status = this_.data.status
            if (status == 1) {
              this_.Wining();
            }
          }, 500)
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
   * 是否中奖
   * */ 
  Wining : function(){
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      wa_id: waId,
      sessionId: sessionId
    }
    common.common_ajax(url + '?c=FreeLottery&a=open_prize', param, true, function (data) {
      if (data.result == 'success') {
       let newData = data.data;
        prizeId = newData.prize[0].prize_id;
        let isWining = newData.prize_in_userSelf==1 ? false : true;
        let address;
        if (newData.address[0]){
          address = newData.address[0];
        }else{
          address = 0
        }
        let showAddress = false;
        if(!address){

        }else{
          showAddress = true
        }
        this_.setData({
          winingData : newData,
          isWining : isWining,
          showmask: true,
          address: address,
          showAddress: showAddress
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
  closePop: function (){
    this.setData({
      showmask: false
    })
  },
  /**
   * 查看更多
   * */ 
  lookMore : function(){
    this.setData({
      height : true
    })
  },
  /**
   * 查看更多
   * */
  moreLottery:function(){
    wx.navigateBack({
      delta: 1,
      success :function(res){
        console.log(res);
      }
    })
  },
  /**
   * 地址选择
   * */
  addressChoose: function () {
    wx.navigateTo({
      url: '/pages/address_list/address_list?type=lottery',
    })
  },
  /**
   * 地址提交
   */
  postAddress: function () {
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let addressId = this_.data.address.address_id
    let param = {
      prizeId: prizeId,
      sessionId: sessionId,
      addressId: addressId,
      waId: waId
    }
    common.common_ajax(url + '?c=WelfareActivity&a=perfectWaWinningAddress', param, true, function (data) {
      if (data.result == 'success') {
        wx.showToast({
          title: '地址填写成功',
          icon: 'success',
          duration: 1500
        })
        this_.setData({
          showAddress: true
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
})