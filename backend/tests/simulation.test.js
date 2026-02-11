import request from 'supertest'
import app from '../server.js'

describe('POST /simulation', () => {

  test('Should create simulation', async () => {

    const res = await request(app)
      .post('/api/simulation')
      .send({
        squareMeters: 80,
        housingType: 'apartment',
        residents: 2,
        energy: { heating: 'gas' },
        locationId: 'loc1',
        sessionId: 'test-session'
      })

    expect(res.statusCode).toBe(200)
    expect(res.body.estimatedConsumptionKWh).toBeDefined()

  })

})

