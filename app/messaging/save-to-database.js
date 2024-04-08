const db = require('../data')

const saveToDatabase = async (message) => {
  try {
    await db.messages.create({
      scheme: message.body.scheme,
      tags: message.body.tags,
      sbi: message.body.sbi,
      content: message.body.content,
      requestedDate: message.body.requestedDate,
      crn: message.body.crn
    })
  } catch (error) {
    console.error('ERROR: ', error)
  }
}
module.exports = { saveToDatabase }
