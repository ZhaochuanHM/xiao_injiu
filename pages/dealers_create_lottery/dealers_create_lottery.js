// pages/dealers_create_activity/dealers_create_activity.js
const token = require('../../utils/token.js');
const common = require('../../utils/common.js');
const app = getApp();


var img = 'https://jsq-show.oss-cn-shenzhen.aliyuncs.com/in-wine/activity_add_pic%403x.png';
var name = '';
var number = '';
var price ='';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 活动ID（不为空表示编辑）
    waId:'',

    //活动名称
    activity_name:'',
    itemNum : [
      {
        img: img,
        name: name,
        number: number,
        price: price
      }
    ],
    // 开奖方式
    open_type : '',
    visible: false,
    actions: [
      {
        name: '按人数开奖',
      },
      {
        name: '按时间开奖'
      },
    ],

    //开奖条件
    openingCondition:'',

    //开奖时间
    date_start: '',
    date_end: '',
    date_open:'',
    date_time:'09:00',

    //人数
    people_num:'',

    // 控制textarea
    textVal : ''
  },
  //活动名称
  getActivity_name(e){
    const text = e.detail.value;
    this.setData({
      activity_name: text
    })
  },
  
  // 添加奖品
  addGoods() {
    var that = this;
    var itemNum = that.data.itemNum;
    var arr = {
      img: img,
      name: name,
      number: number,
      price: price
    };
    itemNum.push(arr);
    that.setData({
      itemNum: itemNum
    })
  },
  // 获取输入框值
  getInputVal(e){
    var index = e.currentTarget.dataset.index;
    var element = e.currentTarget.dataset.name;
    var val = e.detail.value;
    var oldVal = this.data.itemNum;

    switch(element){
      case 'name' :
        oldVal[index].name = val;
        break;
      case 'number':
        oldVal[index].number = val;
        break;
      case 'price':
        oldVal[index].price = val;
        break;
    }
    //修改对应索引值的内容
    this.setData({
      itemNum: oldVal
    })
  },
  // 删除添加的奖品
  delete(e){
    var that = this;
    // 打印出当前选中的index
    console.log(e.currentTarget.dataset.index);
    // 获取到列表数据
    var itemNum = that.data.itemNum;
    // 删除
    itemNum.splice(e.currentTarget.dataset.index, 1);
    console.log(itemNum);
    // 重新渲染
    that.setData({
      itemNum: itemNum
    });
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
    var that = this;
    var index = detail.index;
    var type = index == 0 ? '按人数开奖' : '按时间开奖';
    if (type == '按时间开奖'){
      
      that.now_date();
      that.tomorrow_date(null, 1);
      this.setData({
        openingCondition: 2
      })
    } else if (type == '按人数开奖'){
      that.now_date();
      that.tomorrow_date(null, 1);
      this.setData({
        openingCondition: 1
      })
    }
    this.setData({
      open_type  : type,
      visible: false
    })
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

  //选择开奖时间
  bindDateChange3(e) {
    this.setData({
      date_open: e.detail.value
    })
  },
  //选择开奖时间
  bindDateChange4(e) {
    this.setData({
      date_time: e.detail.value
    })
  },

  //活动名称
  getPeople_num(e) {
    const text = e.detail.value;
    this.setData({
      people_num: text
    })
  },

  // 监听textarea输入
  textInput(e){
    const text = e.detail.value;
    this.setData({
      textVal : text
    })
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取sessionId
    const sessionId = wx.getStorageSync('sessionId');
    var that = this;
    
    //数据回填
    if (options.wa_id) {
      this.setData({ waId: options.wa_id});

      var param1 = {
        sessionId: sessionId,
        waId: options.wa_id
      };

      common.common_ajax(app.globalData.base_host + '?c=Agency&a=waInfo', param1, true, function (data) {

        if (data.data.opening_time != 0){
          var arr1 = data.data.opening_time;
          var arr2 = arr1.split(' ');
          that.setData({
            date_open: arr2[0],
            date_time: arr2[1],
          })
        }

        var itemNum = [];
        for (let i = 0; i < data.data.prize.length; i++) {
          itemNum.push({
            img: data.data.prize[i].prize_theme,
            name: data.data.prize[i].prize_name,
            number: data.data.prize[i].prize_num,
            price: data.data.prize[i].prize_price,
          })

        }

        that.setData({
          activity_name: data.data.wa_name,
          textVal: data.data.wa_brief,
          openingCondition: data.data.opening_condition == 1 ? 1 : 2,
          open_type: data.data.opening_condition == 1 ? '按人数开奖' : '按时间开奖',
          people_num: data.data.opening_people_num,
          date_start: data.data.start_time,
          date_end: data.data.end_time,
          itemNum: itemNum,
        })
      })
    } else {
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

  /*获取当前日期 */
  now_date:function(){
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    
    var now_date = Y+'-'+M+'-'+D;
    this.setData({
      date_start: now_date,
      date_open: now_date
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

  upload_img:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    // console.log(index)
    var oldVal = this.data.itemNum;
    // console.log(oldVal)

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

        wx.uploadFile({
          url: app.globalData.base_host +'?c=UploadFile&a=upload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: para2,
          success(res) {
            const data = JSON.parse(res.data);
            oldVal[index].img = data.data.url;
            //修改对应索引值的内容
            that.setData({
              itemNum: oldVal
            })
          }
        })

      }
    })
  },

  dialog:function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '您确定要提交当前活动？',
      success(res) {
        if (res.confirm) {
          that.submit();
        } else if (res.cancel) {
        }
      }
    })
  },


  //提交数据
  submit:function(){
    var that = this;
    wx.showLoading({
      title: '提交中',

      success(res) {

        
        //获取sessionId
        const sessionId = wx.getStorageSync('sessionId');


        let prizeTheme = [];
        let prizeName = [];
        let prizeNum = [];
        let prizePrice = [];
        let prizeType = [];

        for (let i = 0; i < that.data.itemNum.length; i++) {
          prizeTheme.push(that.data.itemNum[i].img);
          prizeName.push(that.data.itemNum[i].name);
          prizeNum.push(that.data.itemNum[i].number);
          prizePrice.push(that.data.itemNum[i].price);
          prizeType.push(1);
        }
        var param1 = {
          sessionId: sessionId,
          waType: 1,
          waName: that.data.activity_name,
          prizeTheme: JSON.stringify(prizeTheme),
          prizeName: JSON.stringify(prizeName),
          prizeNum: JSON.stringify(prizeNum),
          prizePrice: JSON.stringify(prizePrice),
          prizeType: JSON.stringify(prizeType),
          openingCondition: that.data.openingCondition,
          startTime: that.data.date_start,
          endTime: that.data.date_end,
          openingTime: that.data.date_open +' '+that.data.date_time,
          openingPeopleNum: that.data.people_num,
          waBrief: that.data.textVal
        };

        var waId = that.data.waId;
        var url = waId ? '?c=Agency&a=updateWa' : '?c=Agency&a=createWa';
        var successMsg = '发起活动成功'
        if(waId) {
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