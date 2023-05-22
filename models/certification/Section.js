import mongoose from 'mongoose'

const SectionSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  },
  section: {
    type: String,
    required: [true, 'Section is required'],
    trim: true,
    minlength: 1,
    maxlength: 150
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam'
  }
})

SectionSchema.index({ section: 1, exam: 1 }, { unique: true })

export default mongoose.model('Section', SectionSchema)
