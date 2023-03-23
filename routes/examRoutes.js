import express from 'express'
import { createExam, getAllExams } from '../controllers/examController.js'

const router = express.Router()

router.route('/').post(createExam).get(getAllExams)

export default router
