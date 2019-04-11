//app.js
const common = require('/utils/common.js')
App({
  onLaunch: function () {

    var that = this;
    wx.checkSession({
      success() {
        const is_reg = wx.getStorageSync('is_reg');
        var pages = getCurrentPages() //获取加载的页面
        var currentPage = pages[pages.length - 1] //获取当前页面的对象
        var url = currentPage.route //当前页面url
        if (is_reg && url == that.globalData.login_route) {
          // session_key 未过期，并且在本生命周期一直有效
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      },
      fail() {
        that.login();
      }
    })
  },


  login: function () {
    var that = this;
    // 登录
    wx.login({
      success: function (res) {
        //用户登录凭（证有效期五分钟）
        if (res.code) {
          var param1 = {
            code: res.code
          };
          // --------- 发送凭证 ------------------
          common.common_ajax(that.globalData.base_host + '?c=WeChat&a=code2Session', param1, true, function (data) {

            wx.setStorageSync('sessionId', data.data.session_id);
            wx.setStorageSync('is_reg', data.data.is_reg);
            // session_key 已经失效，需要重新执行登录流程
            var pages = getCurrentPages() //获取加载的页面
            var currentPage = pages[pages.length - 1] //获取当前页面的对象
            var url = currentPage.route //当前页面url
            if (url != that.globalData.login_route){
              wx.redirectTo({
                url: '/pages/login/login'
              })
            }
          })

        } else {
          alert('获取用户登录态失败：' + res.errMsg);
        }
      }
    })
  },



  globalData: {
    base_host: 'https://wlcapi.in-wine.net',
    login_route: 'pages/login/login'
  }


})