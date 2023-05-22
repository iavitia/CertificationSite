import { Section, Exam } from '../models/certification/index.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'
import mongoose from 'mongoose'
import checkPermissions from '../utils/checkPermissions.js'

const createSection = async (req, res) => {
  try {
    const { examId, section } = req.body

    // Check if required data is present in the request body
    if (!examId || !section) {
      throw new BadRequestError('Exam ID and section are required')
    }

    // validate that the exam ID is valid
    const isValidExamId = mongoose.Types.ObjectId.isValid(examId)
    if (!isValidExamId) {
      throw new BadRequestError('Invalid exam ID')
    }

    // Find the exam that this section belongs to
    const existingExam = await Exam.findById(examId)
    if (!existingExam) {
      throw new BadRequestError('Exam not found')
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
      createdBy: req.user.userId,
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

const getSectionById = async (req, res) => {
  try {
    const section = await Section.findById(req.params.sectionId)

    if (!section) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Section not found'
      })
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Section fetched successfully',
      section
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch section',
      error: error.message
    })
  }
}

const updateSection = async (req, res) => {
  try {
    const { section } = req.body
    const sectionId = req.params.sectionId

    // Check if required data is present in the request body
    if (!section) {
      throw new BadRequestError('Section name is required')
    }

    // Check if sectionId is a valid ObjectId
    const isValidSectionId = mongoose.Types.ObjectId.isValid(sectionId)
    if (!isValidSectionId) {
      throw new BadRequestError('Invalid section ID')
    }

    // Find the section to update
    const existingSection = await Section.findById(sectionId)
    if (!existingSection) {
      throw new NotFoundError('Section not found')
    }

    // Validate section name length
    if (section.length < 1 || section.length > 150) {
      throw new BadRequestError(
        'Section name must be between 1 and 150 characters'
      )
    }

    // Validate that the section name is unique
    const existingSectionWithSameName = await Section.findOne({
      section
    })
    if (
      existingSectionWithSameName &&
      existingSectionWithSameName._id != sectionId
    ) {
      throw new BadRequestError('Section name already exists')
    }

    // Update the section name
    existingSection.section = section

    // Save the updated section
    const updatedSection = await existingSection.save()

    res.status(StatusCodes.OK).json({
      success: true,
      message: `Section updated successfully to ${updatedSection.section}`,
      section: updatedSection
    })
  } catch (error) {
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to update section',
      error: error.message
    })
  }
}

const deleteSection = async (req, res) => {
  try {
    const sectionId = req.params.sectionId

    // Check if sectionId is a valid ObjectId
    const isValidSectionId = mongoose.Types.ObjectId.isValid(sectionId)
    if (!isValidSectionId) {
      throw new BadRequestError('Invalid section ID')
    }

    // Find the section to delete
    const existingSection = await Section.findById(sectionId)
    if (!existingSection) {
      throw new NotFoundError('Section not found')
    }

    checkPermissions(req.user, existingSection.createdBy)

    // Delete the section
    await existingSection.remove()

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Section deleted successfully'
    })
  } catch (error) {
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to delete section',
      error: error.message
    })
  }
}

export {
  createSection,
  getAllSections,
  getSectionById,
  updateSection,
  deleteSection
}
