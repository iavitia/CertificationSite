import express from 'express'
import {
  createOrganization,
  getAllOrganizations
} from '../controllers/organizationController.js'

const router = express.Router()

router.route('/').post(createOrganization).get(getAllOrganizations)

export default router
