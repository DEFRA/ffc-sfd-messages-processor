require('./insights').setup()
require('log-timestamp')
const { startMessaging } = require('./messaging')
const { createServer } = require('./server')

const init = async () => {
  const server = await createServer()
  await server.start()
  await startMessaging()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
