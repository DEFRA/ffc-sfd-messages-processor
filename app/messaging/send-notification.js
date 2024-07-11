const { v4: uuidv4 } = require('uuid')
const NotifyClient = require('notifications-node-client').NotifyClient

const sendNotification = async (message) => {
  const notifyClient = new NotifyClient(process.env.NOTIFY_API_KEY)
  await notifyClient.sendEmail(
    process.env.NOTIFY_TEMPLATE_ID,
    process.env.NOTIFY_TEST_EMAIL, {
      personalisation: {
        heading: message.body.content.heading,
        content: message.body.content.body
      },
      reference: uuidv4()
    })
}
module.exports = { sendNotification }
