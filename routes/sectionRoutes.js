import express from 'express'
import {
  createSection,
  getAllSections
} from '../controllers/sectionController.js'

const router = express.Router()

router.route('/').post(createSection).get(getAllSections)

export default router
