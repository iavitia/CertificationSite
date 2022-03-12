import express from 'express'
import {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  updateQuestion,
  showStats
} from '../controllers/questionController.js'

const router = express.Router()

router.route('/').post(createQuestion).get(getAllQuestions)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteQuestion).patch(updateQuestion)

export default router
