import request from 'supertest'
import app from '../server.js'

describe('GET history', () => {

  test('Get history', async () => {

    const res = await request(app)
      .get('/api/simulation/history/test-session')

    expect(res.statusCode).toBe(200)

  })

})

