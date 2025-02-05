// * Importing to use express Router
import express from 'express'
const router = express.Router()
// * Imported Controller Files
import {
  saveCompoundingMedicine,
  getCompoundingMedicines
} from '../controllers/compoundingMedicineController.js'
// * Importing Custom Middleware
import { admin, protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, saveCompoundingMedicine).get(protect, admin, getCompoundingMedicines);

export default router
