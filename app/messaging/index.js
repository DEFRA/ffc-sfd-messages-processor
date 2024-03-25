const util = require('util')
const { messageConfig } = require('../config')
const { MessageReceiver } = require('ffc-messaging')
const { saveToDatabase } = require('./save-to-database')
const { sendMessage } = require('./send-message')

const handleMessage = async (message, receiver) => {
  try {
    console.log('Received message: ', message.body)
    await saveToDatabase(message)
    await sendMessage(message)
    await receiver.completeMessage(message)
  } catch(err) {
    console.error('Error with message-processor message:', util.inspect(err.message, false, null, true))
  }

}

const startMessaging = async () => {
  let processorReceiver
  const processorAction = message => handleMessage(message, processorReceiver)
  processorReceiver = new MessageReceiver(messageConfig.processorSubscription, processorAction)
  await processorReceiver.subscribe()
  console.info(`Receiver ready to receive processor messages`)
}

module.exports = { startMessaging }
