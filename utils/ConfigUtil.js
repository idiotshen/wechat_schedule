const config = require('../config/message')
const request = require('request-promise')
const cheerio = require('cheerio')
const moment = require('moment')

module.exports = {
  async parseConfig (contact) {
    let configList = []
    let contactConfig = config[contact]
    for (let value of contactConfig) {
      await configList.push(await parseSingleElement(value))
    }

    return configList
  }
}

async function parseSingleElement (element) {
  if (!element.placeholder) {
    return element
  }

  let result = JSON.parse(JSON.stringify(element))
  result.placeholder = {}

  if (typeof result.memory === 'object') {
    for (let key in result.memory) {
      result[key] = parseMemory(result.memory[key])
    }
  }

  for (let key in element.placeholder) {
    if (typeof element.placeholder[key] === 'string') {
      result.placeholder[key] = element.placeholder[key]
    } else if (typeof element.placeholder[key] === 'object') {
      result.placeholder[key] = await parsePlaceholder(element.placeholder[key])
    }
  }

  return result
};

async function parsePlaceholder (placeholder) {
  let content = ''

  if (placeholder.content) {
    content = placeholder.content
  } else if (placeholder.url && placeholder.element) {
    let body = await request.get(placeholder.url)
    let response = null
    try {
      response = JSON.parse(body)
    } catch (e) {
      response = {}
    }
    let $ = cheerio.load(body)

    content = {}
    for (let el of placeholder.element) {
      if (el.select) {
        content[el.name] = $(el.select).text()
      } else if (el.field) {
        content[el.name] = el.field.split('.').reduce((pre, cur) => pre[cur], response)
      } else {
        throw new Error('缺少必要参数')
      }
    }
  }

  return content
}

function parseMemory (memory) {
  return parseInt(moment().diff(memory) / 1000 / 60 / 60 / 24)
}
