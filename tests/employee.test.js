const request = require('supertest')
const app = require('../app')
const { setupDatabase, userOne } = require('./db')

beforeAll(setupDatabase)

test('Should list employee details after getting token', async () => {
   await request(app)
      .patch('/getemployees')
      .set('x-auth-token', `${userOne.token}`)
      .send({
         skipCount: 5,
         filterValue: 'All',
         search: '',
      })
      .expect(200)
})

test('Should not list employee details without token', async () => {
   await request(app)
      .patch('/getemployees')
      .send({
         skipCount: 5,
         filterValue: 'All',
         search: '',
      })
      .expect(401)
})
