const db = require('../data')

const formatDateToUK = (date) => {
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  return new Date(year, month, day)
}

const saveToDatabase = async (message) => {
  try {
    const requestedDate = new Date(message.body.requestedDate)

    if (isNaN(requestedDate)) {
      throw new Error('Invalid requestedDate')
    }

    const formattedDate = formatDateToUK(requestedDate)

    await db.messages.create({
      scheme: message.body.scheme,
      tags: message.body.tags,
      crn: message.body.crn,
      sbi: message.body.sbi,
      content: message.body.content,
      requestedDate: formattedDate
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = { saveToDatabase }
