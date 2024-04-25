const { format, parse } = require('date-fns')
const db = require('../data')

const saveToDatabase = async (message) => {
  try {
    const requestedDate = parse(
      message.body.requestedDate,
      'dd-MM-yyyy',
      new Date()
    )

    const requestedDateUK = format(requestedDate, 'yyyy-MM-dd')

    await db.messages.create({
      scheme: message.body.scheme,
      tags: message.body.tags,
      crn: message.body.crn,
      sbi: message.body.sbi,
      content: message.body.content,
      requestedDate: requestedDateUK
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = { saveToDatabase }
