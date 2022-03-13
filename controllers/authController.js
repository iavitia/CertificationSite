import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'

const register = async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    throw new BadRequestError('Please provide all values')
  }

  const existingEmail = await User.findOne({ email })
  if (existingEmail) {
    throw new BadRequestError('Email already taken')
  }
  const existingUsername = await User.findOne({ username })
  if (existingUsername) {
    throw new BadRequestError('Username already taken')
  }
  const user = await User.create({ username, email, password })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({
    user: {
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location
    },
    token
  })
}

const login = async (req, res) => {
  res.send('Login user')
}

const updateUser = async (req, res) => {
  res.send('Update user')
}

export { register, login, updateUser }
