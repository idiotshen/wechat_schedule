const { Wechaty } = require('wechaty') // import { Wechaty } from 'wechaty'
const schedule = require('./schedule/index')
const base = require('./config/base')

function onScan (qrcode, status) {
  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode)
  ].join('')
  console.log(qrcodeImageUrl)
}

const client = new Wechaty()

client.on('scan', onScan)
client.on('login', (user) => {
  console.log(`User ${user} login`)
  schedule.sendMessage(client, base.contactList)
})
client.on('message', (message) => console.log(`Message: ${message}`))
client.start()
