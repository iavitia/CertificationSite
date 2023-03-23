import { Section, Exam } from '../models/Certifications.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'

const createSection = async (req, res) => {
  try {
    const { examId, section } = req.body

    // Check if required data is present in the request body
    if (!examId || !section) {
      throw new BadRequestError('Exam ID and section are required')
    }

    // Find the exam by its ID
    const existingExam = await Exam.findById(examId)

    // Check if the exam exists
    if (!existingExam) {
      throw new BadRequestError('Invalid Exam ID')
    }

    // Check if the section already exists for the exam
    const existingSection = await Section.findOne({
      section,
      exam: existingExam._id
    })

    if (existingSection) {
      throw new BadRequestError('Section already exists for this exam')
    }

    // Create a new section for the exam
    const newSection = await Section.create({
      section,
      questions: [],
      exam: existingExam._id
    })

    // Add the section ID to the exam's sections array
    existingExam.sections.push(newSection._id)
    await existingExam.save()

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Section created successfully',
      section: newSection
    })
  } catch (error) {
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to create section',
      error: error.message
    })
  }
}

const getAllSections = async (req, res) => {
  try {
    const sections = await Section.find({})
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Sections fetched successfully',
      sections
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch sections',
      error: error.message
    })
  }
}

export { createSection, getAllSections }
