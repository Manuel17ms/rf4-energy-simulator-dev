import request from 'supertest'
import app from '../server.js'

describe('GET /compare', () => {

  test('Compare location', async () => {

    const res = await request(app)
      .get('/api/simulation/compare/loc1')

    expect(res.statusCode).toBe(200)

  })

})
