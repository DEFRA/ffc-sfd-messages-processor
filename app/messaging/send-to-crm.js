const { MessageSender } = require('ffc-messaging')
const { senderConfig } = require('../config')

const sendToCrm = async (message) => {
  const sender = new MessageSender(senderConfig.senderTopic)
  try {
    await sender.sendMessage({
      body: message.body,
      type: 'send-to-crm',
      source: 'ffc-sfd-messages-processor'
    })
    console.log('Message sent to CRM:', message.body)
  } catch (error) {
    throw new Error(`Error sending message to CRM: ${error.message}`)
  }
}

module.exports = { sendToCrm }
