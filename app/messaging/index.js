const { MessageReceiver } = require('ffc-messaging')
const { Client } = require('pg')

const saveToDb = async (message) => {
  const client = new Client({
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    port: 5432
  })

  await client.connect()
  const insertQuery = `INSERT INTO messages (content) VALUES ('${message.body.content}')`
  await client.query(insertQuery)
  await client.end()
  console.log('Message saved to database: ', message.body)
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
    address: 'ffc-sfd-messages-processor-subscription',
    topic: 'ffc-sfd-messages-processor',
    type: 'subscription'
  }, handleMessage)

  await receiver.subscribe()
}

module.exports = { startMessaging }
