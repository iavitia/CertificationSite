import express from 'express'
import {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion
} from '../controllers/questionController.js'

const router = express.Router()

router.route('/').post(createQuestion).get(getAllQuestions)
router
  .route('/:questionId')
  .delete(deleteQuestion)
  .patch(updateQuestion)
  .get(getQuestionById)

export default router
