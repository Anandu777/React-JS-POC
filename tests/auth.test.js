const request = require('supertest')
const app = require('../app')
const { setupDatabase, userOne } = require('./db')

beforeAll(setupDatabase)

test('Should register a user', async () => {
   await request(app)
      .post('/register')
      .send({
         email: 'user2@example.com',
         password: '123456',
      })
      .expect(200)
})

test('Should not register a new user', async () => {
   await request(app)
      .post('/register')
      .send({
         email: 'user2@example.com',
         password: '123456',
      })
      .expect(400)

   await request(app)
      .post('/register')
      .send({
         email: 'user3@example.com',
         password: '12345',
      })
      .expect(400)

   await request(app)
      .post('/register')
      .send({
         email: '',
         password: '123456',
      })
      .expect(400)

   await request(app)
      .post('/register')
      .send({
         email: '',
         password: '',
      })
      .expect(400)
})

test('Should login exisitng user', async () => {
   const email = 'user1@example.com'
   const password = '123456'
   await request(app)
      .post('/login')
      .send({
         email,
         password,
      })
      .expect(200)
})

test('Should not login non exisitng user', async () => {
   const email = 'user@example.com'
   const password = '123456'
   await request(app)
      .post('/login')
      .send({
         email,
         password,
      })
      .expect(401)
})

test('Should not be able to change password without token', async () => {
   await request(app)
      .patch('/changepassword')
      .send({
         oldPassword: '123456',
         password: '567890',
      })
      .expect(401)
})

test('Should not be able to change password with wrong old password with token', async () => {
   await request(app)
      .patch('/changepassword')
      .set('x-auth-token', `${userOne.token}`)
      .send({
         oldPassword: '12345',
         password: '567890',
      })
      .expect(401)
})

test('Should be able to change password with token', async () => {
   await request(app)
      .patch('/changepassword')
      .set('x-auth-token', `${userOne.token}`)
      .send({
         oldPassword: '123456',
         password: '567890',
      })
      .expect(200)
})

test('Should get authenticated user with token', async () => {
   await request(app)
      .get('/getuser')
      .set('x-auth-token', `${userOne.token}`)
      .expect(200)
})

test('Should not get user without token', async () => {
   await request(app).get('/getuser').expect(401)
})
