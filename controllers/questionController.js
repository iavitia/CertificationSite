import { Question, Section } from '../models/Certifications.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'
import mongoose from 'mongoose'

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
      user: req.user.id, // ID of the user who created this question
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

const deleteQuestion = async (req, res) => {
  res.send('delete question')
}

const updateQuestion = async (req, res) => {
  res.send('update question')
}

export { createQuestion, deleteQuestion, getAllQuestions, updateQuestion }
