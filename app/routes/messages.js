const db = require('../data')
const { GET } = require('../constants/http-verbs')

module.exports = [
  {
    method: GET,
    path: '/messages',
    handler: async (request, h) => {
      try {
        const result = await db.messages.findAll()
        console.log('result: ', result[0])
        return h.response(result).code(200)
      } catch (error) {
        console.log(error)
      }
    }
  },
  {
    method: GET,
    path: '/messages/{id}',
    handler: async (request, h) => {
      try {
        const result = await db.messages.findOne({ where: { id: request.params.id } })
        console.log('Query: select by id')
        return h.response(result).code(200)
      } catch (error) {
        console.log(error)
      }
    }
  }
]
