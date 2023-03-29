import { Exam, Organization } from '../models/Certifications.js'
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

export { createExam, getAllExams }
