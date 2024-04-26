const db = require('../data')

const saveToDatabase = async (message) => {
  try {
    const [day, month, year] = message.body.requestedDate.split('-')

    await db.messages.create({
      scheme: message.body.scheme,
      tags: message.body.tags,
      crn: message.body.crn,
      sbi: message.body.sbi,
      content: message.body.content,
      requestedDate: new Date(`${year}-${month}-${day}`)
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = { saveToDatabase }
