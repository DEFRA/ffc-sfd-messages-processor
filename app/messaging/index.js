const { MessageReceiver } = require('ffc-messaging')
const { saveToDatabase } = require('./save-to-database')
const { sendMessage } = require('./send-message')

const handleMessage = async (message) => {
  console.log('Received message: ', message.body)
  saveToDb(message)
  sendViaNotify(message)
}

const startMessaging = async () => {
  const receiver = new MessageReceiver({
    useCredentialChain: false,
    host: process.env.MESSAGE_HOST,
    username: process.env.MESSAGE_USER,
    password: process.env.MESSAGE_PASSWORD,
    address: 'ffc-sfd-messages-processor',
    topic: 'ffc-sfd-messages',
    type: 'subscription'
  }, handleMessage)

  await receiver.subscribe()
}

module.exports = { startMessaging }
