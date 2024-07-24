const util = require('util')
const { messageConfig } = require('../config')
const { MessageReceiver } = require('ffc-messaging')
const { sendNotification } = require('./send-notification')

const handleMessage = async (message, receiver) => {
  try {
    console.log('Received message: ', message.body)
    await sendNotification(message)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Error with processing message:', util.inspect(err, { showHidden: false, depth: null, colors: true }))
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
