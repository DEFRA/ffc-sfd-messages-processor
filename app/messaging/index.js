const util = require('util')
const { messageConfig } = require('../config')
const { MessageReceiver } = require('ffc-messaging')
const { CRM, SEND_EMAIL } = require('../constants/message-types')
const { sendNotification } = require('./send-notification')
const { sendToCrm } = require('./send-to-crm')

const handleMessage = async (message, receiver) => {
  try {
    console.log('Received message: ', message.body)

    const type = message.applicationProperties.type
    switch (type) {
      case SEND_EMAIL:
        await sendNotification(message)
        break
      case CRM:
        await sendToCrm(message)
        break
      default:
        throw new Error(`Unknown request type: ${type}`)
    }

    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Error with processing message:', util.inspect(err.message, false, null, true))
  }
}

const startMessaging = async () => {
  let processorReceiver //eslint-disable-line
  const processorAction = message => handleMessage(message, processorReceiver)
  processorReceiver = new MessageReceiver(messageConfig.processorSubscription, processorAction)
  await processorReceiver.subscribe()
  console.info('Messages processor is ready to receive messages')
}

module.exports = { startMessaging }
