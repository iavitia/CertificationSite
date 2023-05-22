import mongoose from 'mongoose'

const OrganizationSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  },
  organizationName: {
    type: String,
    required: [true, 'Organization is required'],
    minlength: 1,
    maxlength: 150,
    trim: true,
    unique: true
  },
  exams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }]
})

export default mongoose.model('Organization', OrganizationSchema)
