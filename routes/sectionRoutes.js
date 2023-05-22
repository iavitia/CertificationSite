import express from 'express'
import {
  createSection,
  getAllSections,
  getSectionById,
  updateSection,
  deleteSection
} from '../controllers/sectionController.js'

const router = express.Router()

router.route('/').post(createSection).get(getAllSections)
router
  .route('/:sectionId')
  .patch(updateSection)
  .get(getSectionById)
  .delete(deleteSection)

export default router
