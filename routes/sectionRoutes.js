import express from 'express'
import { createSection } from '../controllers/sectionController.js'

const router = express.Router()

router.route('/').post(createSection)

export default router
