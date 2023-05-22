import { Organization } from '../models/certification/index.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'
import mongoose from 'mongoose'
import checkPermissions from '../utils/checkPermissions.js'

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
      createdBy: req.user.userId,
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

const getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.organizationId)
    if (!organization) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Organization not found'
      })
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Organization fetched successfully',
      organization
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch organization',
      error: error.message
    })
  }
}

const updateOrganization = async (req, res) => {
  try {
    const organizationId = req.params.organizationId
    const { organizationName } = req.body

    if (!organizationName) {
      throw new BadRequestError('Organization name is required')
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

    // Validate organization name length
    if (organizationName.length < 1 || organizationName.length > 150) {
      throw new BadRequestError(
        'Organization name must be between 1 and 150 characters'
      )
    }

    // VaLidate organization name is unique
    const existingOrganization = await Organization.findOne({
      organizationName
    })
    if (existingOrganization && existingOrganization._id != organizationId) {
      throw new BadRequestError('Organization name already exists')
    }

    const oldOrganizationName = organization.organizationName

    const updatedOrganization = await Organization.findByIdAndUpdate(
      organizationId,
      { organizationName },
      { new: true, runValidators: true }
    )

    res.status(StatusCodes.OK).json({
      success: true,
      message: `Organization updated successfully from '${oldOrganizationName}' to '${organizationName}'`,
      organization: updatedOrganization
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to update organization',
      error: error.message
    })
  }
}

const deleteOrganization = async (req, res) => {
  try {
    const organizationId = req.params.organizationId

    // validate that the organization ID is a valid MongoDB ID
    const isValidId = mongoose.Types.ObjectId.isValid(organizationId)
    if (!isValidId) {
      throw new BadRequestError('Invalid organization ID')
    }

    // Find the organization by ID
    const existingOrganization = await Organization.findById(organizationId)
    if (!existingOrganization) {
      throw new BadRequestError('Organization not found')
    }

    checkPermissions(req.user, existingOrganization.createdBy)

    await Organization.findByIdAndDelete(organizationId)

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Organization deleted successfully'
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to delete organization',
      error: error.message
    })
  }
}

export {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization
}
