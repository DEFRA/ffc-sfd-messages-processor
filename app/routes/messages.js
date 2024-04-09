const db = require('../data')
const { GET } = require('../constants/http-verbs')

module.exports = [
  {
    method: GET,
    path: '/messages',
    handler: async (request, h) => {
      try {
        const result = await db.messages.findAll()
        console.log('result: ', result)
        return h.response({ data: result }).code(200)
      } catch (error) {
        console.log(error)
      }
    }
  },
  {
    method: GET,
    path: '/messages/{sbi}',
    handler: async (request, h) => {
      try {
        const result = await db.messages.findAll({
          where: {
            sbi: request.params.sbi
          }
        })
        console.log('Query: select by sbi')
        return h.response({ data: result }).code(200)
      } catch (error) {
        console.log(error)
      }
    }
  }
]
