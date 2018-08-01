# weather
# -搭建温度和天气描述
# -添加图片/设置导航条颜色
#    -app.json 中设置navigationBarBackgroundColor

# -动态显示天气和温度时注意：
    1)更新data中的值 必须使用  this.setData({  }) 
    2)映射中英文天气

# -动态显示背景图片和导航条


# -下拉刷新
    -开启下拉刷新
      1） 在window中添加属性，并设置为true，改变
      2） 将"点点点"显示出来，配置 backgroundTextStyle 为 dark
    -结束下拉刷新
      1） 当获取完当前数据后，执行结束刷新x.stopPullDownRefresh()