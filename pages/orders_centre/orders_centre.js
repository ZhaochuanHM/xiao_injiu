// pages/orders_centre/orders_centre.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEnd : false,
    // 不通过model隐藏
    hiddenmodalput: true,
    reason : ' ',
    autofocus : false,
    // 填写收获码
    hiddenmodal: true,
    code: ' ',
    focus: false

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
  /**
   * 进行中的订单
   */ 
  going:function(){
    this.setData({
      isEnd : false
    })
  },
  /**
   * 已完成的订单
   */
  completed: function () {
    this.setData({
      isEnd: true
    })
  },
  /**
   * 未通过原因弹窗
   * */ 
  nopassSource:function(){
    wx.showModal({
      title: '原因',
      content: '因为用户申请用酒量超过存酒量，请核对之后重新申请',
      showCancel : false
    })
  },
  /**
   * 驳回原因弹窗
   * */ 
  reject:function(){
    this.setData({
      hiddenmodalput: false,
      autofocus: true
    })
  },
  cancelM: function (e) {
    this.setData({
      hiddenmodalput: true,
      reason : ''
    })
  },
  confirmM: function (e) {
    console.log("原因：" + this.data.reason);
    this.setData({
      hiddenmodalput: true,
      reason: ''
    })
  },
  reason: function (e) {
    this.setData({
      reason: e.detail.value
    })
  },
  /**
   * 通过弹窗
   * */
  pass:function(){
    wx.showModal({
      title: '提示',
      content: '是否同意申请',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 填写收货码弹窗
   * */
  cashPrize: function () {
    this.setData({
      hiddenmodal: false,
      focus: true
    })
  },
  cancel: function (e) {
    this.setData({
      hiddenmodal: true,
      code : ''
    })
  },
  confirm: function (e) {
    console.log("兑奖码：" + this.data.code);
    this.setData({
      hiddenmodal: true,
      code: ''
    })
  },
  codeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
})