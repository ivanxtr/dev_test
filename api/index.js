import express from 'express'
import cors from 'cors'
import { JSONFilePreset } from 'lowdb/node'
import passport from 'passport'
import session from 'express-session'
import LocalStrategy from 'passport-local'
import path from 'path'
import cookieParser from 'cookie-parser'

import api from './routes/api.js'
import auth from './routes/auth.js'

import data from '../data/users.json' assert { type: 'json' }

const defaultData = { ...data }
const db = await JSONFilePreset('db.json', defaultData)
db.write()

const app = express()
const __dirname = path.resolve()

app.use(cookieParser())
app.use(
  cors({
    origin: ['http://localhost:8080', 'http://localhost:3000'],
    credentials: true,
  })
)
app.locals.db = db

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: 'my-test-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
)
app.use(passport.initialize())
app.use(passport.session())

passport.use(
  new LocalStrategy(function (username, password, done) {
    db.read()
    const user = db.data.users.find((user) => user.email === username)
    if (!user) {
      return done(null, false)
    }
    if (user.password !== password) {
      return done(null, false)
    }
    return done(null, user)
  })
)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (id, done) {
  done(null, true)
})
app.use('/auth', auth)
app.use('/api', api)
app.use(express.static(path.join(__dirname, '../client/build')))
app.get('*', (req, res) =>
  res.sendFile(path.resolve('../client', 'build', 'index.html'))
)

app.listen(8080, () => {
  console.log('Server is running on port 8080')
})

export default app
