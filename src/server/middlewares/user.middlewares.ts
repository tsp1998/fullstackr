//@ts-nocheck
const bcrypt = require('bcrypt')
const { v4: uuidV4 } = require('uuid')

exports.usernameModifier = (req, res, next) => {
  try {
    const { item } = req.body || {}
    if (!item) {
      throw new Error('No item provided...')
    }
    item.username = uuidV4()
    req.body.item = item
    next()
  } catch (error) {
    next(error)
  }
}

exports.passwordHasher = async (req, res, next) => {
  try {
    const { item } = req.body || {}
    if (!item) {
      throw new Error('No user data provided...')
    }
    item.password = bcrypt.hashSync(item.password, 12)
    req.body.item = item
    next()
  } catch (error) {
    next(error)
  }
}