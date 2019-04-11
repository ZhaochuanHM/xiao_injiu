// pages/my_change_phone2/my_change_phone2.js
const token = require('../../utils/token.js');
const common = require('../../utils/common.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel:'',
    checkcode:'',
    timer: '',//定时器名字
    countDownNum: '获取验证码',//倒计时初始值
    disabled: false
  },
  pageTo(e) {
    common.pageTo(e)
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
  //手机号
  changetel(e) {
    const text = e.detail.value;
    this.setData({
      tel: text
    })
  },

  //验证码
  changecheckcode(e) {
    const text = e.detail.value;
    this.setData({
      checkcode: text
    })
  },

  /* 提交 */
  submit:function(){
    var that = this;

    wx.showLoading({
      title: '更改中',
      success(res) {
        //获取sessionId
        const sessionId = wx.getStorageSync('sessionId');

        var param1 = {
          sessionId: sessionId,
          newMobile:that.data.tel,
          VerCode:that.data.checkcode,
        };

        common.common_ajax(app.globalData.base_host + '?c=Tracingsource&a=VerificationNewMobile', param1, true, function (data) {

          if (data.result == 'success') {
            setTimeout(function () {
              wx.hideLoading()
              wx.showToast({
                title: '更改成功',
                icon: 'success',
                duration: 2000
              })

              wx.navigateTo({
                url: '/pages/my_set/my_set'
              })

            }, 2000)

          } else {
            setTimeout(function () {
              wx.hideLoading();
              wx.showToast({
                title: data.msg,
                icon: 'none',
                duration: 2000
              })
            }, 2000)

          }

        })
      }
    })
  },

  /**
   * 验证码
   */
  countDown: function () {
    let that = this;
    

    //获取sessionId
    const sessionId = wx.getStorageSync('sessionId');
    var param1 = {
      sessionId: sessionId,
      mobile: that.data.tel,
    };

    common.common_ajax(app.globalData.base_host + '?c=Tracingsource&a=sendLoginVerifyCode', param1, true, function (data) {

      if (data.result == 'success') {
        let countDownNum = 60;//获取倒计时初始值
        that.setData({
          disabled: true
        })

        //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
        that.setData({
          timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
            //每隔一秒countDownNum就减一，实现同步
            countDownNum--;
            //然后把countDownNum存进data，好让用户知道时间在倒计着
            that.setData({
              countDownNum: countDownNum
            })
            //在倒计时还未到0时
            if (countDownNum == 0) {
              //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
              clearInterval(that.data.timer);
              that.setData({
                countDownNum: '获取手机号'
              })
              that.setData({
                disabled: false
              })
              //关闭定时器之后，可作其他处理codes go here
            }
          }, 1000)
        })



        wx.showToast({
          title: '验证码发送成功',
          icon: 'success',
          duration: 2000
        })


      } else {


        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000
        })


      }

    })


    
  }

})