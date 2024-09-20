const { sendNotification } = require('../../app/messaging/send-notification')
const { v4: uuidv4 } = require('uuid')
const NotifyClient = require('notifications-node-client').NotifyClient

jest.mock('notifications-node-client')
jest.mock('uuid')

describe('should successfully send email via GOV.UK Notify', () => {
  let mockSendEmail

  beforeEach(() => {
    mockSendEmail = jest.fn()

    NotifyClient.mockImplementation(() => {
      return {
        sendEmail: mockSendEmail
      }
    })

    uuidv4.mockReturnValue('mocked-uuid-reference')
  })

  it('should send an email with the correct data', async () => {
    const message = {
      body: {
        heading: 'Test Heading',
        body: 'Test body content',
        sbi: '123456789',
        id: '111222333',
        organisationId: '4567890'
      }
    }

    process.env.NOTIFY_API_KEY = 'test-api-key'
    process.env.NOTIFY_MESSAGES_TEMPLATE_ID = 'test-template-id'
    process.env.NOTIFY_TEST_EMAIL = 'test@example.com'

    await sendNotification(message)

    expect(mockSendEmail).toHaveBeenCalledWith(
      'test-template-id',
      'test@example.com',
      {
        personalisation: {
          heading: 'Test Heading',
          content: 'Test body content',
          messagesHyperlink: 'http://localhost:3000/messages/notification/123456789/111222333/?organisationId=4567890'
        },
        reference: 'mocked-uuid-reference'
      }
    )

    expect(mockSendEmail).toHaveBeenCalledTimes(1)
  })
})
