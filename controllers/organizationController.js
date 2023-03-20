import { Organization } from '../models/Certifications.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'

const createOrganization = async (req, res) => {
  try {
    const { organizationName } = req.body

    if (!organizationName) {
      throw new BadRequestError('Please provide an organization name')
    }

    // Check if an organization with the same name already exists
    const organization = await Organization.findOne({
      organizationName: { $regex: new RegExp(`^${organizationName}$`, 'i') }
    })
    if (organization) {
      throw new BadRequestError('An organization with this name already exists')
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

export { createOrganization }
