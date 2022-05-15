//@ts-nocheck
const jwt = require('jsonwebtoken')

const decodeTokenFromRequestHeaders = req => {
  const { authorization } = req.headers || {}
  if (!authorization) {
    throw new Error('No authorization headers found...')
  }
  const [_, token] = authorization.split(' ')
  if (!token) {
    throw new Error('No authorization token found...')
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  if (!decodedToken.user) {
    throw new Error('Not a valid token')
  }
  return decodedToken
}

exports.requiresAuth = async (req, res, next) => {
  try {
    const decodedToken = decodeTokenFromRequestHeaders(req)
    req.user = decodedToken.user
    next()
  } catch (error) {
    next(error)
  }
}

exports.requiresAdminAuth = async (req, res, next) => {
  try {
    const decodedToken = decodeTokenFromRequestHeaders(req)
    const { user = {} } = decodedToken
    if (user.type !== 'admin') {
      throw new Error('Admin login required...')
    }
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}