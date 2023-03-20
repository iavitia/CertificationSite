import mongoose from 'mongoose'

const QuestionSchema = new mongoose.Schema(
  {
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
      minlength: 25,
      maxlength: 5000,
      trim: true
    },
    choices: {
      type: [String],
      minlength: 1,
      maxlength: 150,
      required: [true, 'Choices are required'],
      trim: true,
      validate: [
        (choices) => {
          return choices.length >= 2 && choices.length <= 6
        },
        'Choices must be between 2 and 6'
      ]
    },
    correctAnswer: {
      type: [String],
      required: [true, 'Correct answer is required'],
      validate: [
        {
          validator: function (correctAnswer) {
            return !(this.choices.length === 2 && correctAnswer.length > 1)
          },
          message: 'There can only be 1 correct answer when there are 2 choices'
        },
        {
          validator: function () {
            return this.correctAnswer.length >= 1
          },
          message: 'At least 1 correct answer is required'
        },
        {
          validator: function () {
            return this.choices.length <= 2
              ? true
              : this.correctAnswer.length <= this.choices.length
          },
          message:
            'Number of correct answers must be less than or equal to the number of choices'
        },
        {
          validator: function (correctAnswer) {
            const choices = this.choices
            const correctAnswers = correctAnswer.map((answer) =>
              answer.toLowerCase()
            )
            const choicesLowerCase = choices.map((choice) =>
              choice.toLowerCase()
            )
            return correctAnswers.every((answer) =>
              choicesLowerCase.includes(answer)
            )
          },
          message: 'Correct answer must be in choices'
        }
      ]
    },
    solution: {
      type: String,
      required: [true, 'Solution is required'],
      minlength: 25,
      maxlength: 10000
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty is required'],
      enum: {
        values: ['easy', 'medium', 'hard'],
        message: 'Difficulty must be either easy, medium or hard'
      },
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
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section',
      required: true
    }
  },
  { timestamps: true }
)

const SectionSchema = new mongoose.Schema({
  section: {
    type: String,
    required: [true, 'Section is required'],
    trim: true,
    unique: true,
    minlength: 1,
    maxlength: 150
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam'
  }
})

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

const OrganizationSchema = new mongoose.Schema({
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

const Question = mongoose.model('Question', QuestionSchema)
const Section = mongoose.model('Section', SectionSchema)
const Exam = mongoose.model('Exam', ExamSchema)
const Organization = mongoose.model('Organization', OrganizationSchema)

export { Question, Section, Exam, Organization }
