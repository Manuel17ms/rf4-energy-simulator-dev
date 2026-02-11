import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import request from 'supertest'
import app from '../server.js'

beforeAll(async () => {

  await connectDB(process.env.MONGODB_URI)

})

afterAll(async () => {

  await mongoose.connection.close()

})

describe('GET /compare', () => {

  test('Compare location', async () => {

    const res = await request(app)
      .get('/api/simulation/compare/loc1')

    expect(res.statusCode).toBe(200)

  })

})
