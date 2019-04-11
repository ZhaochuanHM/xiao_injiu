// pages/dealers_create_picture/dealers_create_picture.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img : '',
    imgArr: [
      {
        img: 'https://jsq-show.oss-cn-shenzhen.aliyuncs.com/in-wine/activity_default_pic%403x.png',
        is_check: true
      },
      {
        img: 'https://jsq-show.oss-cn-shenzhen.aliyuncs.com/in-wine/default-prize6.png',
        is_check: false
      },
      {
        img: 'https://jsq-show.oss-cn-shenzhen.aliyuncs.com/in-wine/default-prize7.png',
        is_check: false
      },
      {
        img: 'https://jsq-show.oss-cn-shenzhen.aliyuncs.com/in-wine/default-prize8.png',
        is_check: false
      },
      {
        img: 'https://jsq-show.oss-cn-shenzhen.aliyuncs.com/in-wine/default-prize9.png',
        is_check: false
      },
      {
        img: 'https://jsq-show.oss-cn-shenzhen.aliyuncs.com/in-wine/default-prize10.png',
        is_check: false
      }
    ]
  },
  checkImg(e){
    var index = e.currentTarget.dataset.index;
    var imgs = this.data.imgArr;
    for(const i in imgs){
      if(i == index){
        imgs[i].is_check = true;
      }else{
        imgs[i].is_check = false;
      }
    }
    this.setData({
      imgArr : imgs
    })
  },
  chooseImage(e){
    var that = this;
    wx.chooseImage({
      sizeType: 'compressed',
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
      }
    })
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