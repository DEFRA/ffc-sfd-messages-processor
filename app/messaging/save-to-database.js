const db = require('../data')

const formatDateToUK = (date) => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

const saveToDatabase = async (message) => {
  try {
    const formattedDate = formatDateToUK(new Date(message.body.requestedDate))

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
