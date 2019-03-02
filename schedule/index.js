const clientUtil = require('../utils/ClientUtil')
const contentUtil = require('../utils/ContentUtil')
const schedule = require('node-schedule')

module.exports = {
  async sendMessage (client, contactNameList) {
    schedule.scheduleJob(`* * 7 * * *`, async function () {
      for (let contact of contactNameList) {
        let contentList = await contentUtil.getContent(contact)
        clientUtil.sendMessage(client, contact, contentList)
      }
    })
  }
}
