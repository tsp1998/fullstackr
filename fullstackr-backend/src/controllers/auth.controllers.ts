//@ts-nocheck
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import itemServices from '../services/item.services/item.services'

export const login = async (req, res, next) => {
  try {
    const { item } = req.body || {}
    if (!item) {
      throw new Error('No authorization data provided...')
    }
    const { username, password } = item
    const user = await itemServices.getItem(User, {
      filter: {
        $or: [
          { email: username }, { phone: username }, { username }
        ]
      }
    })
    const compareResult = bcrypt.compareSync(password, user.password)
    if (!compareResult) {
      throw new Error('Wrong credentials provided...')
    }
    delete user.password
    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.json({ token })
  } catch (error) {
    next(error)
  }
}