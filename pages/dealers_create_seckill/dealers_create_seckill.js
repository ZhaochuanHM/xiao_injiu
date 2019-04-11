// pages/dealers_create_seckill/dealers_create_seckill.js
const token = require('../../utils/token.js');
const common = require('../../utils/common.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 活动ID（不为空表示编辑）
    waId: '',

    // 开奖方式
    open_type: '',
    visible: false,
    actions: [
      {
        name: '实物奖品',
      },
      {
        name: '酒币秒杀'
      },
    ],
    //活动名称
    activity_name: '',
    activity_img: 'https://jsq-show.oss-cn-shenzhen.aliyuncs.com/in-wine/activity_add_pic%403x.png',
    gift_name: '',
    gift_number: '',
    prizeType:'',
    coin_num:'',
    price1: '',
    price2: '',
    date_start: '',
    date_end: '',
    seckill_time:'09:00',
    textVal: ''
  },

  //活动名称
  getActivity_name(e) {
    const text = e.detail.value;
    this.setData({
      activity_name: text
    })
  },

  //奖品名称
  getGift_name(e) {
    const text = e.detail.value;
    this.setData({
      gift_name: text
    })
  },

  //奖品数量
  getGift_number(e) {
    const text = e.detail.value;
    this.setData({
      gift_number: text
    })
  },

  //原价
  price1(e) {
    const text = e.detail.value;
    this.setData({
      price1: text
    })
  },

  //秒杀价格
  price2(e) {
    const text = e.detail.value;
    this.setData({
      price2: text
    })
  },

  //酒币数量
  coin_num(e) {
    const text = e.detail.value;
    this.setData({
      price2: text
    })
  },

  //规则
  textVal(e) {
    const text = e.detail.value;
    this.setData({
      textVal: text
    })
  },

  // 选择弹窗
  handleOpen() {
    this.setData({
      visible: true
    });
  },
  handleCancel() {
    this.setData({
      visible: false
    });
  },

  handleClickItem({ detail }) {
    var index = detail.index;
    var type = index == 0 ? '实物奖品' : '酒币秒杀';

    if (type == '实物奖品') {
      this.setData({
        prizeType: 2
      })
    } else if (type == '酒币秒杀') {
      this.setData({
        prizeType: 1
      })
    }

    this.setData({
      open_type: type,
      visible: false
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取sessionId
    const sessionId = wx.getStorageSync('sessionId');
    //初始化时间
    that.now_date();
    that.tomorrow_date(null, 1);

    //数据回填
    if (options.wa_id){
      this.setData({ waId: options.wa_id });

      var param1 = {
        sessionId: sessionId,
        waId: options.wa_id
      };

      common.common_ajax(app.globalData.base_host + '?c=Agency&a=waInfo', param1, true, function (data) {
        console.log(data);
        
        that.setData({
          activity_name: data.data.wa_name,
          activity_img: data.data.prize[0].prize_theme,
          open_type: data.data.prize[0].prize_type == 1 ? '实物奖品' : '酒币秒杀',
          prizeType: data.data.prize[0].prize_type == 1 ? 1 : 2,
          gift_name: data.data.prize[0].prize_name,
          gift_number: data.data.prize[0].prize_num,
          price1: data.data.prize[0].prize_price,
          price2: data.data.prize[0].now_price,
          date_start: data.data.start_time,
          date_end: data.data.end_time,
          seckill_time: data.data.sec_kill_time,
          textVal: data.data.wa_brief,

        })
      })
    }else{
      return false;
    }
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

  //选择开始时间
  bindDateChange1(e) {
    this.setData({
      date_start: e.detail.value
    })
  },
  //选择结束时间
  bindDateChange2(e) {
    this.setData({
      date_end: e.detail.value
    })
  },

  //选择结束时间
  bindDateChange3(e) {
    this.setData({
      seckill_time: e.detail.value
    })
  },

  /*获取当前日期 */
  now_date: function () {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    var now_date = Y + '-' + M + '-' + D;
    this.setData({
      date_start: now_date
    })
  },

  /*获取明天日期 */
  tomorrow_date: function (today, addDayCount) {
    var dd;
    if (today) {
      dd = new Date(today);
    } else {
      dd = new Date();
    }
    dd.setDate(dd.getDate() + addDayCount);//获取AddDayCount天后的日期 
    var Y = dd.getFullYear();
    var M = dd.getMonth() + 1;//获取当前月份的日期 
    var D = dd.getDate();
    if (M < 10) {
      M = '0' + M;
    };
    if (D < 10) {
      D = '0' + D;
    };

    var tomorrow_date = Y + '-' + M + '-' + D;
    this.setData({
      date_end: tomorrow_date
    })
  },

  upload_img: function (e) {
    var that = this;
    var oldVal = this.data;

    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        const sessionId = wx.getStorageSync('sessionId');
        // oldVal[index].img = tempFilePaths;
        const para1 = {
          sessionId: sessionId,
          uploadDir: '/in-wine/activity'
        }
        const para2 = token.token1_request(para1);
        console.log(JSON.stringify(para2));
        wx.uploadFile({
          url: app.globalData.base_host + '?c=UploadFile&a=upload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: para2,
          success(res) {
            const data = JSON.parse(res.data);
            oldVal.activity_img = data.data.url;
            //修改对应索引值的内容
            that.setData({
              activity_img: oldVal.activity_img
            })

            wx.showToast({
              title: data.msg,
              icon: 'success',
              duration: 2000
            })
          }
        })

      }
    })
  },

  dialog: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '您确定要提交当前活动？',
      success(res) {
        if (res.confirm) {
          that.submit();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },


  //提交数据
  submit: function () {
    var that = this;

    wx.showLoading({
      title: '提交中',
      success(res){

        //获取sessionId
        const sessionId = wx.getStorageSync('sessionId');


        let prizeTheme = [];
        let prizeName = [];
        let prizeNum = [];
        let prizePrice = [];
        let prizeType = [];




        prizeTheme.push(that.data.activity_img);
        prizeName.push(that.data.gift_name);
        prizeNum.push(that.data.gift_number);
        prizePrice.push(that.data.price1);
        prizeType.push(that.data.prizeType);


        var param1 = {
          sessionId: sessionId,
          waType: 2,
          waName: that.data.activity_name,
          prizeTheme: JSON.stringify(prizeTheme),
          prizeName: JSON.stringify(prizeName),
          prizeNum: JSON.stringify(prizeNum),
          prizePrice: JSON.stringify(prizePrice),
          prizeType: JSON.stringify(prizeType),
          nowPrice: that.data.price2,
          startTime: that.data.date_start,
          endTime: that.data.date_end,
          secKillTime: that.data.date_start + ' ' + that.data.seckill_time,
          waBrief: that.data.textVal
        };

        var waId = that.data.waId;
        var url = waId ? '?c=Agency&a=updateWa' : '?c=Agency&a=createWa';
        var successMsg = '发起活动成功'
        if (waId) {
          param1.waId = waId
          successMsg = '编辑活动成功'
        }

        common.common_ajax(app.globalData.base_host + url, param1, true, function (data) {
          
          if (data.result == 'success') {
            setTimeout(function () {
              wx.hideLoading()
              wx.showToast({
                title: successMsg,
                icon: 'success',
                duration: 2000
              })

              wx.navigateTo({
                url: '/pages/dealer_tools/dealer_tools'
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
    
    

  }
})