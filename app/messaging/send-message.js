const { uuid } = require('uuidv4')
const NotifyClient = require('notifications-node-client').NotifyClient


const sendMessage = async (message) => {
  const notifyClient = new NotifyClient(process.env.NOTIFY_API_KEY)
  await notifyClient.sendEmail(process.env.NOTIFY_TEMPLATE_ID, 'rana.salem@defra.gov.uk', {
    personalisation: {
      heading: message.body.content.heading,
      content: message.body.content.body
    },
    reference: uuid()
  })
}
module.exports = { sendMessage }
