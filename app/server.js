const Hapi = require('@hapi/hapi')
const Joi = require('joi')
const { serverConfig } = require('./config')

const createServer = async () => {
  const server = Hapi.server({
    port: serverConfig.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    },
    router: {
      stripTrailingSlash: true
    }
  })

  server.validator(Joi)
  await server.register(require('./plugins/logging'))
  await server.register(require('./plugins/router'))

  return server
}

module.exports = { createServer }
