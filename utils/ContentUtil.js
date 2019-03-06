const contentUtil = require('./ConfigUtil')
const moment = require('moment')

module.exports = {
  async getContent (contactName) {
    let configList = await contentUtil.parseConfig(contactName)
    let contentList = []

    configList.forEach(config => {
      if (config.date) {
        let expectDate = moment(config.date)
        let now = moment()
        if (now.year === expectDate.year && now.month === expectDate.month && now.day === expectDate.day) {
          contentList.push(parseContent(config))
        }
      } else {
        contentList.push(parseContent(config))
      }
    })

    return contentList
  }
}

function parseContent (config) {
  let content = config.template
  let reg = /\{\{([\w|.]*)\}\}/

  while (reg.test(content)) {
    content = content.replace(reg, (match, $1) => {
      if (config[$1]) {
        return config[$1]
      } else if ($1.includes('.')) {
        return $1.split('.').reduce((pre, cur) => pre[cur], config.placeholder)
      } else {
        throw new Error('缺少替换参数')
      }
    })
  }

  return content
}

