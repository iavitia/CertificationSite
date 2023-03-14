import mongoose from 'mongoose'

const QuestionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: 10,
    maxlength: 150,
    trim: true
  },
  question: {
    type: String,
    required: [true, 'Question is required'],
    minlength: 50,
    maxlength: 5000,
    trim: true
  },
  choices: {
    type: [String],
    minlength: 10,
    maxlength: 150,
    required: [true, 'Choices are required'],
    trim: true,
    minitems: [2, 'At least 2 choices are required'],
    maxitems: [6, 'At most 6 choices are allowed']
  },
  correctAnswer: {
    type: [String],
    required: [true, 'Correct answer is required'],
    minItems: [1, 'At least 1 correct answer is required'],
    maxItems: { $cond: { if: { $eq: ['$choices', 2] }, then: 1, else: null } },
    validate: [
      (correctAnswer, { choices }) => {
        const correctAnswers = correctAnswer.map((answer) =>
          answer.toLowerCase()
        )
        const choicesLowerCase = choices.map((choice) => choice.toLowerCase())
        return correctAnswers.every((answer) =>
          choicesLowerCase.includes(answer)
        )
      },
      'Correct answer must be in choices'
    ]
  },
  solution: {
    type: String,
    required: [true, 'Solution is required'],
    minlength: 50,
    maxlength: 10000
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty is required'],
    enum: ['easy', 'medium', 'hard'],
    trim: true
  },
  upvotes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
  ],
  downvotes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      comment: {
        type: String,
        required: [true, 'Comment is required'],
        minlength: 10,
        maxlength: 500,
        trim: true
      },

      date: { type: Date, default: Date.now }
    }
  ],
  date: { type: Date, default: Date.now }
})

const SectionSchema = new mongoose.Schema({
  section: {
    type: String,
    required: [true, 'Section is required'],
    trim: true,
    validate: [
      (section, { parent }) => {
        return parent.exam.sections.includes(section)
      },
      'Section must match an existing section for this certification'
    ]
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
})

const ExamSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: [true, 'Exam name is required'],
    trim: true
  },
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }]
})

const OrganizationSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: [true, 'Organization is required'],
    minlength: 10,
    maxlength: 150,
    trim: true
  },
  exam: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }]
})

const Question = mongoose.model('Question', QuestionSchema)
const Section = mongoose.model('Section', SectionSchema)
const Exam = mongoose.model('Exam', ExamSchema)
const Organization = mongoose.model('Organization', OrganizationSchema)

export { Question, Section, Exam, Organization }
