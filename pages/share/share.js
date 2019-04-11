// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:'',
    width:'',
    prurl:'',
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showShareMenu({
      withShareTicket: true
    })
    
    var that = this;
    var w = wx.getSystemInfoSync().windowWidth;
    var h = wx.getSystemInfoSync().windowHeight;

    that.setData({
      height: h,
      width: w,
    })

    /* 获取个人信息 */
    const userInfo = wx.getStorageSync('userInfo');
    that.setData({
      userInfo: userInfo
    })


    

    /* 下载头像 */
    wx.downloadFile({
      url: that.data.userInfo.avatarUrl, // 仅为示例，并非真实的资源
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          console.log(res.tempFilePath)
          /* 下载头像存入缓存 */
          wx.setStorageSync('url1', res.tempFilePath);


          /* 创建 canvas 画布 */
          const ctx = wx.createCanvasContext('shareImg')

          /* 绘制背景 */
          ctx.drawImage('../../images/share_bg.png', 0, 0, w, h / 1.2)
          ctx.restore();

          /* 绘制头像 */
          let logo = wx.getStorageSync('url1');
          console.log(logo)
          ctx.drawImage(logo, w / 2 - 35, h / 30, 70, 70)
          ctx.restore();

          /* 绘制标题 */
          ctx.setFontSize(15);
          ctx.setFillStyle('#ffffff');
          ctx.setTextAlign('center');
          ctx.fillText('谢谢你参加抽奖活动', w / 2, h / 6);
          ctx.restore();

          /* 绘制时间 */
          ctx.setFontSize(12);
          ctx.setFillStyle('#ffffff');
          ctx.setTextAlign('center');
          ctx.fillText('2019-03-02 12:00准时开抢', w / 2, h / 4.5);
          ctx.restore();

          /* 绘制奖品 */
          ctx.drawImage('../../images/canvas.png', w / 2 - 150, h / 3.7, 300, 150);
          ctx.restore();

          /* 绘制奖品信息 */
          ctx.setFontSize(12);
          ctx.setFillStyle('#000000');
          ctx.setTextAlign('center');
          ctx.fillText('奖品：五粮春45度 - 500ml', w / 3.3, h / 1.95);
          ctx.restore();


          /* 绘制小程序二维码 */
          ctx.drawImage('../../images/code.png', w / 2 - 50, h / 1.7, 100, 100)
          ctx.restore();


          /* 绘制奖品信息 */
          ctx.setFontSize(14);
          ctx.setFillStyle('#000000');
          ctx.setTextAlign('center');
          ctx.fillText('长按小程序码，参与抽奖', w / 2, h / 1.3);
          ctx.restore();



          ctx.draw();

        }
      }
    })

  },


  save_img:function(){
    var that = this
    var w = wx.getSystemInfoSync().windowWidth;
    var h = wx.getSystemInfoSync().windowHeight;

    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: w,
      height: h/1.2,
      destWidth: w,
      destHeight: h/1.2,
      canvasId: 'shareImg',
      success: function (res) {
        /* 这里 就可以显示之前写的 预览区域了 把生成的图片url给image的src */
        that.setData({
          prurl: res.tempFilePath
        })

        wx.saveImageToPhotosAlbum({
          filePath: that.data.prurl,
          success(res) {
            wx.showToast({
              title: '图片已保存',
              icon: 'success',
              duration: 2000
            })
          },
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '生成图片失败',
          icon: 'none',
          duration: 2000
        })
      }
    })


  }
})