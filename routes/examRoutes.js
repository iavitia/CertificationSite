import express from 'express'
import {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam
} from '../controllers/examController.js'

const router = express.Router()

router.route('/').post(createExam).get(getAllExams)
router.route('/:examId').patch(updateExam).get(getExamById).delete(deleteExam)

export default router
