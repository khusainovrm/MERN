const { Router } = require('express')
const router = Router()
const bycrpyt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/default.json')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({
      min: 6,
    }),
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request)

      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регристрации',
        })
      }

      const { email, password } = request.body
      const candidate = await User.findOne({ email })

      if (candidate) {
        return response
          .status(400)
          .json({ message: 'Пользователь с таким email уже зарегистрирован.' })
      }

      const hashedPassword = await bycrpyt.hash(password, 12)
      const user = new User({ email, password: hashedPassword })

      await user.save()

      response.status(200).json({ message: 'Пользователь создан!' })
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  }
)

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(),
  ],
  async (requrest, response) => {
    try {
      const errors = validationResult(request)

      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему',
        })
      }

      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user) {
        return response.status(400).json({ message: 'Пользователь не найден' })
      }

      const isMatch = await bycrpyt.compare(password, user.password)

      if (!isMatch) {
        return response
          .status(400)
          .json({ message: 'Неверный пароль, попробуйте снова' })
      }

      const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
        expiresIn: '1h',
      })
      response.json({ token, userId: user.id })
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  }
)

module.exports = router
