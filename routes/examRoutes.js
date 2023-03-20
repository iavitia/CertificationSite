import express from 'express'
import { createExam } from '../controllers/examController.js'

const router = express.Router()

router.route('/').post(createExam)

export default router
