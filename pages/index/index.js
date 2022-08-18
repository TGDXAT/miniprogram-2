// index.js

//依赖导入
//https://juejin.cn/post/7098210302285578253
const apiKey = require("../../utils/apiKey");

Page({
  //页面的初始数据
  data: {
    region:['山东省','青岛市','崂山区'],
    //https://dev.qweather.com/docs/api/weather/weather-now/
    now:{
      temp:0,//温度，默认单位：摄氏度
      text:"未知",//天气状况的文字描述，包括阴晴雨雪等天气状态的描述
      icon:999,//天气状况和图标的代码
      humidity:0,//相对湿度，百分比数值
      pressure:0,//大气压强，默认单位：百帕
      windDir:0,//风向
      windSpeed:0,//风速，公里/小时
      windScale:0//风力等级
    },
    locationID:'0'
  },

  //页面载入完成后执行一次天气更新
  onLoad:function(options){
    this.updateWeather(this.getWeather);
  },

  //当地区改变后执行一次天气更新
  bindRegionChange(e){
    this.setData({region:e.detail.value});
    this.updateWeather(this.getWeather);
  },

  //更新天气
  updateWeather(getWeather){
    //获取locationID，通过和风天气的api
    let that = this;
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup',
      data:{
        location:that.data.region[2].slice(0,2),
        key:apiKey.getkey()
      },
      success(res){
        //更新页面数据中的locationID
        that.setData({locationID:res.data.location[0].id});
        //根据locationID获取天气信息
        getWeather(that,that.data.locationID);
      }
    })
  },

  //获取天气
  getWeather(that,locationID){
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now',
      data:{
        location:locationID,
        key:apiKey.getkey()
      },
      success(res){
        that.setData({now:res.data.now});
      }
    });
  }
})
