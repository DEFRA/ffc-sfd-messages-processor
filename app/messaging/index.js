const db = require('../data')
const { MessageReceiver } = require('ffc-messaging')

const saveToDb = async (message) => {
  try {
    await db.messages.create({ content: message.body.content })
  } catch (error) {
    console.error('ERROR: ', error)
  }
}

const handleMessage = async (message) => {
  console.log('Received message: ', message.body)
  saveToDb(message)
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
