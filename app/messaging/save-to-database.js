const db = require('../data')

const saveToDatabase = async (message) => {
  try {
    const requestedDate = new Date(message.body.requestedDate)
    const day = requestedDate.getDate().toString().padStart(2, '0')
    const month = (requestedDate.getMonth() + 1).toString().padStart(2, '0')
    const year = requestedDate.getFullYear()

    const formattedDate = `${day}-${month}-${year}`

    await db.messages.create({
      scheme: message.body.scheme,
      tags: message.body.tags,
      crn: message.body.crn,
      sbi: message.body.sbi,
      content: message.body.content,
      requestedDate: formattedDate
    })
  } catch (error) {
    console.error('ERROR: ', error)
  }
}

module.exports = { saveToDatabase }
