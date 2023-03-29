import { Organization } from '../models/Certifications.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'

const createOrganization = async (req, res) => {
  try {
    const { organizationName } = req.body

    if (!organizationName) {
      throw new BadRequestError('Please provide an organization name')
    }

    // Check if the organization name already exists
    const existingOrganization = await Organization.findOne({
      organizationName
    })
    if (existingOrganization) {
      throw new BadRequestError('Organization name already exists')
    }

    // Create a new organization
    const organizationObj = await Organization.create({
      organizationName,
      exam: []
    })

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Organization created successfully',
      organization: organizationObj
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to create organization',
      error: error.message
    })
  }
}

const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find({})
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Organizations fetched successfully',
      organizations
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch organizations',
      error: error.message
    })
  }
}

export { createOrganization, getAllOrganizations }
