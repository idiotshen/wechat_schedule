module.exports = {
  '张思远': [
    {
      contactName: '张思远',
      placeholder: {
        one: {
          url: 'http://wufazhuce.com/',
          element: [
            {
              name: 'words',
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
      template: '亲爱的{{contactName}} 你好<br>' +
                '{{moji.tips}}<br>' +
                '今天: {{moji.weather}}<br>' +
                '温度: {{moji.temperature}}<br>' +
                '{{moji.wind}}{{moji.level}}<br>' +
                '空气: {{moji.pollution}}<br>' +
                '{{one.words}}'
    }
  ],
  '林伟健': [
    {
      contactName: '林伟健',
      type: 'text',
      date: '2019-03-02',
      memory: {
        'know': '2018-01-01'
      },
      placeholder: {
        jd: {
          url: 'https://blackhole.m.jd.com/getinfo',
          element: [
            {
              name: 'whwswswws',
              field: 'code'
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
