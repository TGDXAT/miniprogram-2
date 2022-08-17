// index.js

//依赖导入
//https://juejin.cn/post/7098210302285578253
const util = require("../../utils/util");
const apiKey = require("../../utils/apiKey");

// 获取应用实例
const app = getApp()

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
    }
  },

  //页面载入完成后执行一次天气更新
  onLoad:function(options){
    this.getWeather();
  },

  //当地区改变后执行一次天气更新
  bindRegionChange(e){
    this.setData({region:e.detail.value});
    this.getWeather();
  },
  
  //获取天气
  getWeather(){
    let that = this;
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now',
      data:{
        location:util.getLocationID(that.data.region[2].slice(0,2)),//在视图层picker中获取区的信息，再删除“区”字，例如：“崂山”区，处理完后得到“崂山”，再将“崂山”传递给utils的util里的getLocationID函数，得到“崂山”对应的区号101120202，放入请求中
        key:apiKey.getkey()//获取apiKey
      },
      success:function(res){
        that.setData({now:res.data.now})
      }
    })
  }
})
