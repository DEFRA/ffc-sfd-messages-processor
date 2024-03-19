const db = require('../data')
const { MessageReceiver } = require('ffc-messaging')
const NotifyClient = require('notifications-node-client').NotifyClient
const { uuid } = require('uuidv4')

const saveToDb = async (message) => {
  try {
    await db.messages.create({
      scheme: message.body.scheme,
      tags: message.body.tags,
      crn: message.body.crn,
      content: message.body.content,
      requestedDate: message.body.requestedDate
    })
  } catch (error) {
    console.error('ERROR: ', error)
  }
}

const sendViaNotify = async (message) => {
  const notifyClient = new NotifyClient(process.env.NOTIFY_API_KEY)
  await notifyClient.sendEmail(process.env.NOTIFY_TEMPLATE_ID, 'rana.salem@defra.gov.uk', {
    personalisation: {
      heading: message.body.content.heading,
      content: message.body.content.body
    },
    reference: uuid()
  })
}

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
