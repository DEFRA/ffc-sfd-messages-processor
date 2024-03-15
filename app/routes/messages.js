const { GET } = require('../constants/http-verbs')
const { Client } = require('pg')

module.exports = [
  {
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
      console.log('Query: select all')

      return h.response(result.rows).code(200)
    }
  },
  {
    method: GET,
    path: '/messages/{id}',
    handler: async (request, h) => {
      const client = new Client({
        user: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        port: 5432
      })

      await client.connect()
      const selectMessageById = `SELECT * FROM messages WHERE id = ${request.params.id}`
      const result = await client.query(selectMessageById)
      await client.end()
      console.log('Query: select by id')

      return h.response(result.rows).code(200)
    }
  }
]
