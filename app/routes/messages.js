const db = require('../data')
const { GET } = require('../constants/http-verbs')

module.exports = [
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
  },
  {
    method: GET,
    path: '/messages/{sbi}/{id}',
    handler: async (request, h) => {
      try {
        console.log('SBI and ID: ', request.params.sbi, request.params.id)
        const result = await db.messages.findOne({
          where: {
            sbi: request.params.sbi,
            messageId: request.params.id
          }
        })
        console.log('Query: select by sbi then by id')
        return h.response({ data: result }).code(200)
      } catch (error) {
        console.log(error)
      }
    }
  }
]
