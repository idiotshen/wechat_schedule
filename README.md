# wechat_schedule  
## 项目介绍  
在掘金看到了两篇文章 [用Node+wechaty写一个爬虫脚本每天定时给女(男)朋友发微信暖心话](https://juejin.im/post/5c77c6bef265da2de6611cff)
以及[用Node + EJS写一个爬虫脚本每天定时女朋友发一封暖心邮件](https://juejin.im/post/5c75fa4af265da2d84109219)，感觉很有意思，就试着自己也做了一个出来   
在原有的基础上，使用配置文件去配置发送信息  

## 配置文件
```JavaScript
module.exports = {
  'xxx': [   // key 为要发的联系人的名称
    {
      contactName: 'xxx',
      placeholder: {
        one: {     // 针对不同的信息发送不同的请求
          url: 'http://wufazhuce.com/',  
          element: [
            {
              name: 'words',  // name与模板中的名称一样  
              // 网页中的元素定位，直接浏览器里copy selector就行
              select: '#carousel-one > div > div.item.active > div.fp-one-cita-wrapper > div.fp-one-cita > a'
            }
          ]
        },
        moji: {
          url: 'https://tianqi.moji.com/weather/china/shanghai/songjiang-district',
          element: [
            {
              name: 'tips',
              select: 'body > div.wrap.clearfix.wea_info > div.left > div.wea_tips.clearfix > em'
            },
            {
              name: 'weather',
              select: 'body > div.wrap.clearfix.wea_info > div.left > div.wea_weather.clearfix > b'
            },
            {
              name: 'temperature',
              select: 'body > div:nth-child(5) > div.left > div.forecast.clearfix > ul:nth-child(2) > li:nth-child(3)'
            },
            {
              name: 'wind',
              select: 'body > div:nth-child(5) > div.left > div.forecast.clearfix > ul:nth-child(2) > li:nth-child(4) > em'
            },
            {
              name: 'level',
              select: 'body > div:nth-child(5) > div.left > div.forecast.clearfix > ul:nth-child(2) > li:nth-child(4) > b'
            },
            {
              name: 'pollution',
              select: 'body > div.wrap.clearfix.wea_info > div.left > div.wea_alert.clearfix > ul > li > a > em'
            }
          ]
        }
      },
      template: '亲爱的{{contactName}} 你好<br>' +    // 如果只是单纯的文本元素可以不用放在 placeholder 中
                '{{moji.tips}}<br>' +      // 如果是 placeholder 中的元素，需要带上元素的 key
                '今天: {{moji.weather}}<br>' +
                '温度: {{moji.temperature}}<br>' +
                '{{moji.wind}}{{moji.level}}<br>' +
                '空气: {{moji.pollution}}<br>' +
                '{{one.words}}'
    }
  ],
  'xxxxx': [
    {
      contactName: 'xxxx',
      type: 'text',
      date: '2019-03-02',  // 如果有date的话就只会在 date那一天发送
      memory: {       // 用来作为纪念日，会计算日期开始到今天的天数，替换到模板中
        'know': '2018-01-01'
      },
      placeholder: {
        jd: {
          url: 'https://blackhole.m.jd.com/getinfo',
          element: [
            {
              name: 'whwswswws', 
              field: 'code'  // field 用来支持请求返回一个 json, 有嵌套的话，以 obj1.obj2.obj3的格式
            }
          ]
        }
      },
      template: '亲爱的{{contactName}} 你好<br>' +
                '{{jd.whwswswws}}<br>' +
                '我们认识{{know}}天了<br>'
    }
  ]
}
