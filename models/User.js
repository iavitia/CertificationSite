import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      match: [
        /^[A-Za-z0-9_-]*$/,
        'Letters, numbers, dashes, and underscores only. Please try again without symbols.'
      ],
      minlength: 3,
      maxlength: 20,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
      validate: {
        validator: validator.isEmail,
        message: 'Enter a valid email address'
      },
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
      maxlength: 64,
      trim: true,
      select: false
    },
    fullName: {
      type: String,
      trim: true,
      maxlength: 70,
      default: ''
    },
    location: {
      type: String,
      trim: true,
      default: '',
      maxlength: 100
    },
    title: {
      type: String,
      trim: true,
      default: '',
      maxlength: 100
    },
    summary: {
      type: String,
      trim: true,
      default: '',
      maxlength: 500
    },
    social: {
      website: {
        type: String,
        trim: true,
        default: '',
        validate(website) {
          if (website === '') {
            return true
          }
          if (!validator.isURL(website)) {
            throw new Error('Invalid website URL')
          }
        }
      },
      github: {
        type: String,
        trim: true,
        default: '',
        validate(github) {
          if (github === '') {
            return true
          }
          if (!validator.isURL(github)) {
            throw new Error('Invalid GitHub URL')
          }
        }
      },
      linkedIn: {
        type: String,
        trim: true,
        default: '',
        validate(linkedIn) {
          if (linkedIn === '') {
            return true
          }
          if (!validator.isURL(linkedIn)) {
            throw new Error('Invalid LinkedIn URL')
          }
        }
      },
      twitter: {
        type: String,
        trim: true,
        default: '',
        validate(twitter) {
          if (twitter === '') {
            return true
          }
          if (!validator.isURL(twitter)) {
            throw new Error('Invalid Twitter URL')
          }
        }
      }
    },
    date: { type: Date, default: Date.now }
  },
  { collation: { locale: 'en', strength: 2 } }
)

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME
  })
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

export default mongoose.model('User', UserSchema)
