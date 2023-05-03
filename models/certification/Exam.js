import mongoose from 'mongoose'

const ExamSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: [true, 'Exam name is required'],
    trim: true,
    minlength: 1,
    maxlength: 150,
    unique: true
  },
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  }
})

export default mongoose.model('Exam', ExamSchema)
