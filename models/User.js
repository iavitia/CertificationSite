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
    firstName: {
      type: String,
      trim: true,
      default: ''
    },
    lastName: {
      type: String,
      trim: true,
      default: ''
    },
    location: {
      type: String,
      trim: true,
      default: ''
    }
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
