import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, unAuthenticatedError } from '../errors/index.js'

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
  const { username, password } = req.body

  if (!username || !password) {
    throw new BadRequestError('Please provide all values')
  }

  const user = await User.findOne({ username }).select('+password')
  if (!user) {
    throw new unAuthenticatedError('Incorrect username or password')
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new BadRequestError('Incorrect username or password')
  }

  const token = user.createJWT()
  user.password = undefined
  res.status(StatusCodes.OK).json({ user, token })
}

const updateUser = async (req, res) => {
  res.send('Update user')
}

export { register, login, updateUser }
