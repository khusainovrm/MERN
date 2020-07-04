const { modelName } = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config/default.json')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.headers.autherization.spli(' ')[1]

    if (!token) {
      res.status(401).json({ message: 'Нет авторизации' })
      return
    }

    const decoded = jwn.verify(token, config.jwtSecret)
    req.user = decoded

    next()
  } catch (e) {
    res.status(401).json({ message: 'Нет авторизации' })
  }
}
