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
      fullName: user.fullName,
      location: user.location,
      title: user.title,
      summary: user.summary,
      social: user.social
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
    throw new unAuthenticatedError('Incorrect username or password')
  }

  const token = user.createJWT()
  user.password = undefined
  res.status(StatusCodes.OK).json({ user, token })
}

const updateUser = async (req, res) => {
  const { email, fullName, location, title, summary, social } = req.body

  if (!email) {
    throw new BadRequestError('Email is required')
  }

  const existingEmail = await User.findOne({ email })
  if (existingEmail) {
    throw new BadRequestError('Email already in use')
  }

  const user = await User.findOne({ _id: req.user.userId })

  user.email = email
  user.fullName = fullName
  user.location = location
  user.title = title
  user.summary = summary
  user.social = social

  await user.save()

  const token = user.createJWT()

  res.status(StatusCodes.OK).json({ user, token, location: user.location })

  console.log(req.user)
}

export { register, login, updateUser }
