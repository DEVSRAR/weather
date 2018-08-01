// pages/list/list.js
const dayMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五','星期六'];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekdate: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 获取网路数据
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/future',
      data: {
        city: '北京',
        time: new Date()
      },
      success: res => {
        let resdata = res.data.result;  // 数组，包含7天的数据
        let weekdate = [];

        let time = new Date();

        for (var i = 0; i < resdata.length; i++) {

          time.setDate(time.getDate() + i);

          weekdate.push({
            wday:  dayMap[time.getDate()], 
            wdate: `${ time.getFullYear() }-${ time.getMonth() }-${ time.getDate() }`,
            wtemp: `${ resdata[i].minTemp } - ${ resdata[i].maxTemp }`,
            wpath: `/img/${resdata[i].weather}-icon.png`
            
          })
        }
        this.setData({
          weekdate: weekdate
        })
      }
    })
  },


  
 
})