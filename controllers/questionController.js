import { Question, Section } from '../models/certification/index.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'
import mongoose from 'mongoose'
import checkPermissions from '../utils/checkPermissions.js'

const createQuestion = async (req, res) => {
  try {
    const {
      title,
      question,
      choices,
      correctAnswer,
      solution,
      difficulty,
      sectionId // ID of the section that this question belongs to
    } = req.body

    if (
      !title ||
      !question ||
      !choices ||
      !correctAnswer ||
      !solution ||
      !difficulty ||
      !sectionId
    ) {
      throw new BadRequestError(
        'Title, question, choices, correct answer, solution, difficulty and section ID are required'
      )
    }

    // validate that the section ID is valid
    const isValidSectionId = mongoose.Types.ObjectId.isValid(sectionId)
    if (!isValidSectionId) {
      throw new BadRequestError('Invalid section ID')
    }

    // Find the section that this question belongs to
    const section = await Section.findById(sectionId)
    if (!section) {
      throw new BadRequestError('Section not found')
    }

    // Check if the question already exists for the section
    const existingTitle = await Question.findOne({
      title,
      section: section._id
    })

    if (existingTitle) {
      throw new BadRequestError('Title already exists for this section')
    }

    // Create a new question
    const questionObj = await Question.create({
      createdBy: req.user.userId,
      title,
      question,
      choices,
      correctAnswer,
      solution,
      difficulty,
      section: sectionId // Add the section ID to the question's section field
    })

    // Add the newly created question to the section's list of questions
    section.questions.push(questionObj)
    await section.save()

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Question created successfully',
      question: questionObj
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to create question',
      error: error.message
    })
  }
}

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find({})
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Questions fetched successfully',
      questions
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch questions',
      error: error.message
    })
  }
}

const getQuestionById = async (req, res) => {
  const questionId = req.params.questionId
  try {
    const question = await Question.findById(questionId)

    if (question) {
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Question fetched successfully',
        question
      })
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Question not found'
      })
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch question',
      error: error.message
    })
  }
}

const deleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.questionId

    // Check if the question ID is valid
    const isValidQuestionId = mongoose.Types.ObjectId.isValid(questionId)
    if (!isValidQuestionId) {
      throw new BadRequestError('Invalid question ID')
    }

    const existingQuestion = await Question.findOne({ _id: questionId })

    if (!existingQuestion) {
      throw new BadRequestError('Question not found')
    }

    checkPermissions(req.user, existingQuestion.createdBy)

    await existingQuestion.remove()

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Question deleted successfully'
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to delete question',
      error: error.message
    })
  }
}

const updateQuestion = async (req, res) => {
  try {
    const questionId = req.params.questionId
    const { title, question, choices, correctAnswer, solution, difficulty } =
      req.body

    if (
      !title ||
      !question ||
      !choices ||
      !correctAnswer ||
      !solution ||
      !difficulty
    ) {
      throw new BadRequestError('All question fields are required')
    }

    if (!Array.isArray(correctAnswer) || correctAnswer.length < 1) {
      throw new BadRequestError(
        'Correct answer must be an array of at least one string'
      )
    }

    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      throw new BadRequestError('Invalid question ID')
    }

    const existingQuestion = await Question.findOne({ _id: questionId })

    if (!existingQuestion) {
      throw new BadRequestError('Question not found')
    }

    checkPermissions(req.user, existingQuestion.createdBy)

    existingQuestion.title = title
    existingQuestion.question = question
    existingQuestion.choices = choices
    existingQuestion.correctAnswer = correctAnswer
    existingQuestion.solution = solution
    existingQuestion.difficulty = difficulty

    await existingQuestion.save()

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Question updated successfully',
      question: existingQuestion
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to update question',
      error: error.message
    })
  }
}

export {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion
}
