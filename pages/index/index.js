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
};
// 映射导航条颜色
const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

// 引入地理位置SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({
  data: {
    nowTemp: 10,
    nowWeather: "晴",
    nowWeatherBgc: "",
    future: [],
    todayText: '',
    todayTemp: '',
    city: '北京市',
    locationTipText: '点击获取当前位置'
  },

  // 添加下拉刷新处理函数---执行获取当前天气
  onPullDownRefresh() {
    // 获取完数据后---结束下拉刷新
    this.getNowWeather( () => {
      wx.stopPullDownRefresh();
    });
  },

  // 页面加载的时候---执行获取当前天气
  onLoad() {
    this.getNowWeather();

    // 实例化API核心类
    this.qqmapsdk = new QQMapWX({
      key: '6Y6BZ-5HXW4-4A4UC-XBE64-M5ASJ-NSFVN'
    });
  },  

  // 封装函数---获取当前天气
  getNowWeather(callback) {
    // 发起网路请求，获取天气数据
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '北京'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        let { data: resdata } = res;
        // console.log(resdata);
        this.setNow(resdata);
        this.setHoverWeather(resdata);
        this.setToday(resdata);
      },
      // 获取完数据后执行的回调函数,如果有的话
      complete: () => {
        callback && callback()
      }
    })
  },
  // 封装函数---设置当前的温度和天气
  setNow(resdata) {
    // 设置当前温度和天气
    let { result: { now } } = resdata;
    // console.log(now.temp, now.weather);
    // 必须使用this.setData 更行data中的数据，并将中英文映射
    this.setData({
      nowTemp: now.temp,
      nowWeather: weatherMap[now.weather],
      nowWeatherBgc: '/img/' + now.weather + '-bg.png'
    });
    // 动态改变导航条的颜色
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: weatherColorMap[now.weather],
    });
  },

  // 封装函数---设置24h天气的变化
  setHoverWeather(resdata) {
    // 获取未来24h的天气的数据
    let forecastData = resdata.result.forecast;
    // console.log(forecastData);
    // 定义一个空数组，构造成需要的格式
    let future = [];
    // 获取当前时间
    let nowHover = new Date().getHours();
    for (let i = 0; i < 24; i += 3) {
      future.push({
        time: (i + nowHover) % 24 + '时',
        pic: "/img/" + forecastData[i / 3].weather + "-icon.png",
        temp: forecastData[i / 3].temp + '°'
      })
    }
    // 让当前时间为 现在 
    future[0].time = '现在';
    this.setData({
      future: future
    })
  },
  // 封装函数---获取今天的区间温度，及今天的日期
  setToday(resdata) {
    // 获取数据
    let today = resdata.result.today;
    let date = new Date();
    this.setData({
      todayText: `${today.minTemp}° - ${today.maxTemp}°`,
      todayTemp: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 今天`
    })

  },
  // 封装函数---点击事件处理函数---跳转到list页面
  onTapDayWeather() {
    console.log('123');
    // 保留当前页面，跳转到应用内的某个页面
    wx.navigateTo({
      url: '/pages/list/list'

    })
  },
  // 封装函数---获取地理位置处理程序
  onTapLocation() {

    // 获取地理位置
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        // 纬度
        var latitude = res.latitude;
        // 经度
        var longitude = res.longitude;

        // 调用接口
        this.qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          // 调用接口有问题，没有设置白名单
          success: res => {
            
          },
          fail: res => {
            // -----模拟数据：拿到对应的城市，替换掉原来的数据
            this.setData({
              city: '石家庄市',
              locationTipText: ''
            })
          }
        });
      }
    })

  }

})
