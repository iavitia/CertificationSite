import { Exam, Organization } from '../models/Certifications.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'

const createExam = async (req, res) => {
  try {
    const { examName, organizationId } = req.body

    // Check if the exam name already exists in the database
    const existingExam = await Exam.findOne({ examName })
    if (existingExam) {
      throw new BadRequestError('Exam name already exists')
    }

    // Find the organization by ID
    const organization = await Organization.findById(organizationId)
    if (!organization) {
      throw new BadRequestError('Organization not found')
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

export { createExam }
