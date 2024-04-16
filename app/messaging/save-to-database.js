const db = require('../data')

const saveToDatabase = async (message) => {
  try {
    await db.messages.create({
      scheme: message.body.scheme,
      tags: message.body.tags,
      crn: message.body.crn,
      sbi: message.body.sbi,
      content: message.body.content,
      requestedDate: message.body.requestedDate
    })
  } catch (error) {
    console.error('ERROR: ', error)
  }
}
module.exports = { saveToDatabase }
