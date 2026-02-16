import request from 'supertest';
import app from '../server.js';
import { connectTestDB, disconnectTestDB } from './_setupMongo.js';

describe('Auth API', () => {
  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET = 'test_secret_very_long';
    await connectTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  test('POST /api/auth/register creates user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'a@test.com', password: '123456', name: 'Manuel' })
      .expect(201);

    expect(res.body.email).toBe('a@test.com');
  });

  test('POST /api/auth/register rejects duplicate', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'dup@test.com', password: '123456' })
      .expect(201);

    await request(app)
      .post('/api/auth/register')
      .send({ email: 'dup@test.com', password: '123456' })
      .expect(409);
  });

  test('POST /api/auth/login returns token', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'login@test.com', password: '123456' })
      .expect(201);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'login@test.com', password: '123456' })
      .expect(200);

    expect(res.body.token).toBeTruthy();
  });

  test('GET /api/auth/me requires token', async () => {
    await request(app)
      .get('/api/auth/me')
      .expect(401);
  });

  test('GET /api/auth/me returns user with token', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'me@test.com', password: '123456', name: 'Me' })
      .expect(201);

    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: 'me@test.com', password: '123456' })
      .expect(200);

    const token = login.body.token;

    const me = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(me.body.email).toBe('me@test.com');
  });
});
