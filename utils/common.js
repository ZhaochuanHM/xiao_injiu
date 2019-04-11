// token.js
const token = require('token.js');

/**
 * ajax 公共请求
 * 时间：2019年1月8日
 * @param  {String}   url                 接口地址
 * @param  {Object}   data                请求的参数
 * @param  {Boolean}  checktoken          是否检测 token
 * @param  {Function} success_callback    成功返回函数
 */
function common_ajax(url,data,checktoken,success_callback) {
  let param;
  // 检测是否校验 token
  if (checktoken) {
    param = token.token1_request(data);
  }else{
    param = data;
  }

  wx.request({
    url: url, // 接口地址
    data: param,//借口参数
    method:'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      // 未登录直接跳转登录页
      if (res.data.code == '40104' || res.data.code == '40105'){
        wx.redirectTo({
          url: '/pages/login/login',
        })
        // 移除登录缓存
        wx.clearStorageSync();
        return;
      }
      
      // 参数值为res.data,直接将返回的数据传入
      success_callback && success_callback(res.data);
    },
    fail: function () {
      wx.showToast({
        title: '网络错误',
        icon: 'none',
        duration: 2000
      })
    },
  })
}

function pageTo(e){
  var url = e.currentTarget.dataset.url;
  wx.navigateTo({
    url: url,
  })
}

module.exports = {
  common_ajax: common_ajax,
  pageTo : pageTo
}


