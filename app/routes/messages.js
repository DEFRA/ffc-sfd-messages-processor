const { GET } = require('../constants/http-verbs')
const { Client } = require('pg')

module.exports = {
  method: GET,
  path: '/messages',
  handler: async (request, h) => {
    const client = new Client({
      user: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      port: 5432
    })

    await client.connect()
    const getAllMessages = 'SELECT * FROM messages'
    const result = await client.query(getAllMessages)
    await client.end()
    console.log('Query made to database')

    return h.response(result.rows).code(200)
  }
}
