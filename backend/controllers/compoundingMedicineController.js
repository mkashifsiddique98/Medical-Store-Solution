// * Importing to handle the errors
import asyncHandler from 'express-async-handler'
import CompoundingMedicine from '../models/compoundingMedicine.js'

// * Saving Compounding Medicine!!!!
const saveCompoundingMedicine = asyncHandler(async (req, res) => {
  const { name, email, image, message, address } = req.body

  const createdCompoundingMedicine = await CompoundingMedicine.create({
    user: req.user._id,
    name,
    email,
    image,
    message,
    address,
  })
  res.status(201).json(createdCompoundingMedicine)
})

// *  Getting Medicine Interface at Admin End
const getCompoundingMedicines = asyncHandler(async (req, res) => {
  const prescriptions = await CompoundingMedicine.find({}).populate(
    'user',
    'id name'
  )
  res.json(prescriptions)
})

export { saveCompoundingMedicine, getCompoundingMedicines }
