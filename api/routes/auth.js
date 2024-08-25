import express from 'express'
import passport from 'passport'

const router = express.Router()

router.post('/', passport.authenticate('local'), (req, res) => {
  try {
    return res.status(200).json(req.user._id)
  } catch (error) {
    res.status(500).send('something were wrong')
  }
})

router.delete('/logout', (req, res) => {
  try {
    req.session.destroy(function () {
      res.clearCookie('connect.sid')
      res.status(200).send('session cleared')
    })
  } catch (error) {
    res.status(500).send('something were wrong')
  }
})

export default router
