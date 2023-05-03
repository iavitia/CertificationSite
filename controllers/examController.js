import { Exam, Organization } from '../models/certification/index.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'
import mongoose from 'mongoose'

const createExam = async (req, res) => {
  try {
    const { examName, organizationId } = req.body

    if (!examName || !organizationId) {
      throw new BadRequestError('Exam name and organization ID are required')
    }

    // validate that the organization ID is a valid MongoDB ID
    const isValidId = mongoose.Types.ObjectId.isValid(organizationId)
    if (!isValidId) {
      throw new BadRequestError('Invalid organization ID')
    }

    // Find the organization by ID
    const organization = await Organization.findById(organizationId)
    if (!organization) {
      throw new BadRequestError('Organization not found')
    }

    // Check if the exam name already exists in the database
    const existingExam = await Exam.findOne({ examName })
    if (existingExam) {
      throw new BadRequestError('Exam name already exists')
    }

    // Create a new exam
    const exam = await Exam.create({
      examName,
      sections: []
    })

    // Add the exam ID to the organization's exams array
    organization.exams.push(exam._id)
    await organization.save()

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Exam created successfully',
      exam
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to create exam',
      error: error.message
    })
  }
}

const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find({})
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Exams fetched successfully',
      exams
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch exams',
      error: error.message
    })
  }
}

const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.examId)
    if (!exam) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Exam not found'
      })
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Exam fetched successfully',
      exam
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch exam',
      error: error.message
    })
  }
}

const updateExam = async (req, res) => {
  try {
    const examId = req.params.examId
    const { examName } = req.body

    if (!examName) {
      throw new BadRequestError('Exam name is required')
    }

    // validate that the exam ID is a valid MongoDB ID
    const isValidId = mongoose.Types.ObjectId.isValid(examId)
    if (!isValidId) {
      throw new BadRequestError('Invalid exam ID')
    }

    // Find the exam by ID
    const exam = await Exam.findById(examId)
    if (!exam) {
      throw new BadRequestError('Exam not found')
    }

    // Validate exam name length
    if (examName.length < 1 || examName.length > 150) {
      throw new BadRequestError(
        'Exam name must be between 1 and 150 characters'
      )
    }

    // Validate exam name is unique
    const existingExam = await Exam.findOne({ examName })
    if (existingExam && existingExam._id.toString() !== examId) {
      throw new BadRequestError('Exam name already exists')
    }

    const oldExamName = exam.examName

    const updatedExam = await Exam.findByIdAndUpdate(
      examId,
      { examName },
      { new: true, runValidators: true }
    )

    res.status(StatusCodes.OK).json({
      success: true,
      message: `Exam updated successfully from '${oldExamName}' to '${examName}'`,
      exam: updatedExam
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to update exam',
      error: error.message
    })
  }
}

export { createExam, getAllExams, getExamById, updateExam }
