const { v4: uuidv4 } = require('uuid')
const NotifyClient = require('notifications-node-client').NotifyClient

const sendNotification = async (message) => {
  const notifyClient = new NotifyClient(process.env.NOTIFY_API_KEY)
  await notifyClient.sendEmail(
    process.env.NOTIFY_MESSAGES_TEMPLATE_ID,
    process.env.NOTIFY_TEST_EMAIL, {
      personalisation: {
        heading: message.body.heading,
        content: message.body.body,
        messagesHyperlink: `http://localhost:3000/messages/notification/${message.body.sbi}/${message.body.id}/?organisationId=${message.body.organisationId}`
      },
      reference: uuidv4()
    })
}
module.exports = { sendNotification }
