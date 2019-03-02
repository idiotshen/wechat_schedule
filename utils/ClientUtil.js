module.exports = {
  async sendMessage (client, contactName, contentList) {
    let contact = await client.Contact.find({ name: contactName }) || await client.Contact.find({ alias: contactName })
    contentList.forEach((content) => {
      contact.say(content)
    })
  }
}
