import request from 'supertest'
import { expect } from 'chai'
import app from '../index.js'

describe('Session', () => {
  let agent = null
  let server = null

  before(function (done) {
    server = app.listen(done)
    agent = request.agent(server)
  })

  after(function (done) {
    server.close(done)
  })

  it('Should create a session', function (done) {
    agent
      .post('/auth')
      .send({ username: 'boyd.small@endipine.biz', password: '_4rhododfj' })
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        if (err) {
          throw err
        }
        done()
      })
  })

  it('Should return the user info', function (done) {
    agent.get('/api/user/5410953eee9a5b30c3eea476').end(function (err, res) {
      expect(res.status).to.equal(200)
      if (err) {
        throw err
      }
      done()
    })
  })

  it('Should update the user info', function (done) {
    agent
      .put('/api/user/5410953eee9a5b30c3eea476')
      .send({
        name: {
          first: 'Boyd',
          last: 'Small',
        },
        address: '261 Willow Street, Whipholt, Louisiana, 2879',
        email: 'boyd.small@endipine.biz',
        phone: '+1 (814) 437-3837',
        company: 'TEST 2',
      })
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        if (err) {
          throw err
        }
        done()
      })
  })
})
