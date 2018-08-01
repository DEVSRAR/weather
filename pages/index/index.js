//index.js
//获取应用实例
const app = getApp();
// 映射中英文天气
const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}

Page({
  data: {
    nowTemp: 10,
    nowWeather: "晴"
  },

  onLoad() {
    // 发起网路请求，获取天气数据
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now', 
      data: {
        city:'北京'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        let { data: resdata } = res;
        console.log(resdata);
        // 设置当前温度和天气
        let { result: {now} } = resdata;
        console.log(now.temp, now.weather);
        // 必须使用this.setData 更行data中的数据，并将中英文映射
        this.setData({
          nowTemp: now.temp,
          nowWeather: weatherMap[now.weather]
        })
      }
    })
  }
})
