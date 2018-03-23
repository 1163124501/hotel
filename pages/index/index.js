//index.js
//获取应用实例
const app = getApp();
function DateMinus(start, end) {
  var start_date = new Date(start.replace(/-/g, "/"));
  var end_date = new Date(end.replace(/-/g, "/"));
  var days = end_date.getTime() - start_date.getTime();
  var day = parseInt(days / (1000 * 60 * 60 * 24));
  return day;
}
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    num: 1,
    hasUserInfo: false,
    start_date: '',
    end_date: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {
    var date = new Date();
    var FullYear = date.getFullYear();
    var day = date.getDate();
    var Month = (date.getMonth() + 1);
    if (day < 10) {
      var day_1 = '0' + day
      var day_2 = '0' + (parseInt(day) + 1)
    }
    if (Month < 10) {
      Month = '0' + Month
    }
    var start_date = FullYear + '-' + Month + '-' + day_1;
    var end_date = FullYear + '-' + Month + '-' + day_2
    this.setData({
      data: date,
      start_date: start_date,
      end_date: end_date
    })

  },
  order: function (e) {
    if (this.data.num >0) {
      wx.navigateTo({
        url: '../book/book',
      })
    } else {
      wx.showToast({
        image: '/image/false.png',
        title: '日期有误',
      })
    }
    this.num_data()
  },
  // 日期结算
  num_data: function (e) {
    var start_date = new Date(this.data.start_date.replace(/-/g, "/"));
    console.log(start_date)
    var end_date = new Date(this.data.end_date.replace(/-/g, "/"));
    var days = end_date.getTime() - start_date.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    if (day>0) {
      this.setData({
        num: day
      })
    } else {
      wx.showToast({
        image: '/image/false.png',
        title: '日期有误',
      })
      this.onShow()
    }
  },
  // 入驻日期
  start_date: function (e) {
    this.setData({
      start_date: e.detail.value
    })
  },
  // 离店日期
  end_date: function (e) {
    this.setData({
      end_date: e.detail.value
    })
    this.num_data()
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 转发
  onShareAppMessage: function () {

  },
  // 打开位置
  location: function () {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  },
  // 打电话
    makePhoneCall: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: '13977284413',
      success: function () {
        console.log("成功拨打电话")
      }
    })
  }
})
