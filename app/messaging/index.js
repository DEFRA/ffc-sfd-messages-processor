const util = require('util')
const { messageConfig } = require('../config')
const { MessageReceiver } = require('ffc-messaging')
const { sendNotification } = require('./send-notification')
const { saveToDatabase } = require('./save-to-database')
const { sendToCrm } = require('./send-to-crm')

const handleMessage = async (message, receiver) => {
  try {
    console.log('Received message: ', message.body)
    await saveToDatabase(message)
    await sendNotification(message)
    await sendToCrm(message)
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
