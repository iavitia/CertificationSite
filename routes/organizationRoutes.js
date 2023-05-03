import express from 'express'
import {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization
} from '../controllers/organizationController.js'

const router = express.Router()

router.route('/').post(createOrganization).get(getAllOrganizations)
router
  .route('/:organizationId')
  .patch(updateOrganization)
  .get(getOrganizationById)

export default router
