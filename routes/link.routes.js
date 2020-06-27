const { Router } = require('express')
const Link = require('../models/Link')
const router = Router()
const auth = require('../middleware/auth.midleware')
const config = require('./config/default.json')
const shortid = require('shortid')

router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.baseUrl
    const { from } = req.body

    const code = shortid.generate()

    const exsisting = await Link.findOne({ from })
    if (exsisting) {
      return res.status(200).json({ link: exsisting })
    }

    const to = baseUrl + '/t/' + code

    const link = new Link({
      from,
      to,
      code,
      owner: req.user.userId,
    })

    await link.save()
    res.status(201).json({ link })
  } catch (error) {
    response
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId })
    res.json(links)
  } catch (error) {
    response
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.post('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findByID(req.params.id)
    res.json(link)
  } catch (error) {
    response
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
